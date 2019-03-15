var loaderUtils = require('loader-utils');

module.exports = function(source, map) {
    this.callback(null, source, map);
};

module.exports.pitch = function(remainingRequest) {
    this.cacheable();
    return `
        // classnames-loader: automatically bind css-modules to classnames
        var classNames = require('${process.cwd()}/node_modules/classnames/bind');
        var locals = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
        var css = classNames.bind(locals);
        for (var style in locals) css[style] = locals[style];
        module.exports = css;
    `;
}