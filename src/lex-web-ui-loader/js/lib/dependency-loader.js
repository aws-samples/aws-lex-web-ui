/*
 Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

/**
 * Dependency loader class
 *
 * Used to dynamically load external JS/CSS dependencies into the DOM
 */
export class DependencyLoader {
  /**
   * @param {boolean} shouldLoadMinDeps - controls whether the minimized
   *   version of a dependency should be loaded. Default: true.
   *
   * @param {boolean} baseUrl - sets the baseUrl to be prepended to relative
   *   URLs. Default: '/'
   *
   * @param {object} dependencies - contains a field for scripts and css
   *   dependencies. Each field points to an array of objects containing
   *   the dependency definition. The order of array dictates the load sequence.
   *
   *   Each object in the array may contain the following fields:
   *   - name: [required] For scripts, it points to a variable in global
   *     namespace indicating if the script is loaded. It is also used in the
   *     element id
   *   - url: [required] URL where the dependency is loaded
   *   - optional: When set to true, load errors are ignored. Otherwise, if set
   *     to false, the dependency load chain fails
   *   - canUseMin: When set to true, it attempts to load the min version of a
   *     dependency by prepending 'min' before the file extension.
   *
   *   Example:
   *   dependencies = {
   *     'script': [
   *       {
   *         name: 'Vuetify',
   *         url: 'https://unpkg.com/vuetify/dist/vuetify.js',
   *         optional: false,
   *         canUseMin: true,
   *       },
   *     ],
   *     'css': [
   *       {
   *         name: 'vuetify',
   *         url: 'https://unpkg.com/vuetify/dist/vuetify.css',
   *         canUseMin: true,
   *       },
   *     ],
   *   };
   */
  constructor({ shouldLoadMinDeps = true, dependencies, baseUrl = '/' }) {
    if (typeof shouldLoadMinDeps !== 'boolean') {
      throw new Error('useMin paramenter should be a boolean');
    }
    if (!('css' in dependencies) || !Array.isArray(dependencies.css)) {
      throw new Error('missing or invalid css field in dependency parameter');
    }
    if (!('script' in dependencies) || !Array.isArray(dependencies.script)) {
      throw new Error('missing or invalid script field in dependency parameter');
    }
    this.useMin = shouldLoadMinDeps;
    this.dependencies = dependencies;
    this.baseUrl = baseUrl;
  }

  /**
   * Sequentially loads the dependencies
   *
   * Returns a promise that resolves if all dependencies are successfully
   * loaded or rejected if one fails (unless the dependency is optional).
   */
  load() {
    const types = [
      'css',
      'script',
    ];

    return types.reduce((typePromise, type) => (
      this.dependencies[type].reduce((loadPromise, dependency) => (
        loadPromise.then(() => (
          DependencyLoader.addDependency(this.useMin, this.baseUrl, type, dependency)
        ))
      ), typePromise)
    ), Promise.resolve());
  }

  /**
   * Inserts `.min` in URLs before extension
   */
  static getMinUrl(url) {
    const lastDotPosition = url.lastIndexOf('.');
    if (lastDotPosition === -1) {
      return `${url}.min`;
    }
    return `${url.substring(0, lastDotPosition)}.min${url.substring(lastDotPosition)}`;
  }

  /**
   * Builds the parameters used to add attributes to the tag
   */
  static getTypeAttributes(type) {
    switch (type) {
      case 'script':
        return {
          elAppend: document.body,
          tag: 'script',
          typeAttrib: 'text/javascript',
          srcAttrib: 'src',
        };
      case 'css':
        return {
          elAppend: document.head,
          tag: 'link',
          typeAttrib: 'text/css',
          srcAttrib: 'href',
        };
      default:
        return {};
    }
  }

  /**
   * Adds a JS/CSS dependency to the DOM
   *
   * Adds a script or link tag to dynamically load the JS/CSS dependency
   * Avoids adding script tags if the associated name exists in the global scope
   * or if the associated element id exists.
   *
   * Returns a promise that resolves when the dependency is loaded
   */
  static addDependency(useMin = true, baseUrl = '/', type, dependency) {
    if (['script', 'css'].indexOf(type) === -1) {
      return Promise.reject(new Error(`invalid dependency type: ${type}`));
    }
    if (!dependency || !dependency.name || !dependency.url) {
      return Promise.reject(new Error(`invalid dependency parameter: ${dependency}`));
    }

    // load fails after this timeout
    const loadTimeoutInMs = 10000;

    // For scripts, name is used to check if the dependency global variable exist
    // it is also used to build the element id of the HTML tag
    const { name } = dependency;
    if (type === 'script' && name in window) {
      console.warn(`script global variable ${name} seems to already exist`);
      return Promise.resolve();
    }

    // dependency url - can be automatically changed to a min link
    const minUrl = (useMin && dependency.canUseMin) ?
      DependencyLoader.getMinUrl(dependency.url) : dependency.url;

    // add base URL to relative URLs
    const url = (minUrl.match('^http')) ?
      minUrl : `${baseUrl}${minUrl}`;

    // element id - uses naming convention of <lower case name>-<type>
    const elId = `${String(name).toLowerCase()}-${type}`;
    if (document.getElementById(elId)) {
      console.warn(`dependency tag for ${name} seems to already exist`);
      return Promise.resolve();
    }
    const {
      elAppend, typeAttrib, srcAttrib, tag,
    } = DependencyLoader.getTypeAttributes(type);

    if (!elAppend || !elAppend.appendChild) {
      return Promise.reject(new Error('invalid append element'));
    }

    return new Promise((resolve, reject) => {
      const el = document.createElement(tag);

      el.setAttribute('id', elId);
      el.setAttribute('type', typeAttrib);

      const timeoutId = setTimeout(() => (
        reject(new Error(`timed out loading ${name} dependency link: ${url}`))
      ), loadTimeoutInMs);
      el.onerror = () => {
        if (dependency.optional) {
          return resolve(el);
        }
        return reject(new Error(`failed to load ${name} dependency link: ${url}`));
      };
      el.onload = () => {
        clearTimeout(timeoutId);
        return resolve(el);
      };

      try {
        if (type === 'css') {
          el.setAttribute('rel', 'stylesheet');
        }
        el.setAttribute(srcAttrib, url);

        if (type === 'script') {
          // links appended towards the bottom
          elAppend.appendChild(el);
        } else if (type === 'css') {
          // css inserted before other links to allow overriding
          const linkEl = elAppend.querySelector('link');
          elAppend.insertBefore(el, linkEl);
        }
      } catch (err) {
        return reject(new Error(`failed to add ${name} dependency: ${err}`));
      }

      return el;
    });
  }
}

export default DependencyLoader;
