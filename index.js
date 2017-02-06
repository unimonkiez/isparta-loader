'use strict';

var isparta = require('isparta');
var loaderUtils = require('loader-utils');

var defaultConfig = {
    embedSource: true,
    noAutoWrap: true,
    babel: undefined
};

module.exports = function(source) {
    var config = this.query && Object.assign({}, defaultConfig, loaderUtils.parseQuery(this.query));

    // If query not given fallback to default.
    // Also try to take some configutation from `this.options`, which only works on webpack 1
    if (!config) {
        config = this.options.isparta || Object.assign({}, defaultConfig, {
            babel: this.options.babel
        });
    }

    var instrumenter = new isparta.Instrumenter(config);

    if (this.cacheable) {
        this.cacheable();
    }

    return instrumenter.instrumentSync(source, this.resourcePath);
};
