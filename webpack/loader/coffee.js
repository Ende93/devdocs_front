/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
const coffeescript = require('coffeescript');

const schema = {
  "title": "Coffee Loader options",
  "type": "object",
  "description": "Options for CoffeeScript.",
  "additionalProperties": true
};

class CoffeeScriptError extends Error {};

module.exports = function loader(source) {
  const options = this.getOptions(schema);
  const callback = this.async();
  const useSourceMap =
    typeof options.sourceMap === 'boolean' ? options.sourceMap : this.sourceMap;

  let result;

  try {
    result = coffeescript.compile(source, {
      ...{ sourceMap: useSourceMap, bare: true },
      ...options,
      ...{ filename: this.resourcePath },
    });
  } catch (error) {
    callback(new CoffeeScriptError(error));

    return;
  }

  let map;

  if (useSourceMap && result.v3SourceMap) {
    map = JSON.parse(result.v3SourceMap);

    delete map.file;

    result = result.js;
  }

  callback(null, result, map);
}