<script>
/*
Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/
export default {
  name: 'page',
  props: [
    'favIcon',
    'pageTitle',
  ],
  /**
   * Renders page wide settings outside of the app element
   * such as page title, fav icon
   */
  render() {
    // dynamically load favicon and page title from config
    // require favicon file if found or set it to the same file as the toolbar logo
    // Logo loading depends on the webpack require.context API
    // https://webpack.github.io/docs/context.html
    const headElem = document.querySelector('head');

    const favIconElem = document.createElement('link');
    favIconElem.setAttribute('rel', 'fav icon');
    favIconElem.setAttribute('href', this.favIcon);
    headElem.appendChild(favIconElem);

    const titleElem = document.createElement('title');
    titleElem.textContent = this.pageTitle;
    headElem.appendChild(titleElem);
  },
};
</script>
