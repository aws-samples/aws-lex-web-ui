/**
 * Merges config objects. The initial set of keys to merge are driven by
 * the baseConfig. The srcConfig values override the baseConfig ones
 * unless the srcConfig value is empty
 */
module.exports = function mergeConfig(baseConfig, srcConfig) {
  function isEmpty(data) {
    if(typeof(data) === 'number' || typeof(data) === 'boolean') {
      return false;
    }
    if(typeof(data) === 'undefined' || data === null) {
      return true;
    }
    if(typeof(data.length) !== 'undefined') {
      return data.length === 0;
    }
    return Object.keys(data).length === 0;
  }

  // use the baseConfig first level keys as the base for merging
  return Object.keys(baseConfig)
    .map(function (key) {
      let mergedConfig = {};
      let value = baseConfig[key];
      // merge from source if its value is not empty
      if (key in srcConfig && !isEmpty(srcConfig[key])) {
        value = (typeof(baseConfig[key]) === 'object') ?
          // recursively merge sub-objects in both directions
          Object.assign(
            mergeConfig(srcConfig[key], baseConfig[key]),
            mergeConfig(baseConfig[key], srcConfig[key]),
          ) :
          srcConfig[key];
      }
      mergedConfig[key] = value;
      return mergedConfig;
    })
    .reduce(function (merged, configItem) {
        return Object.assign({}, merged, configItem);
      },
      {}
    );
};
