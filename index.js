/*global require: true, module: true*/
var RSVP = require('rsvp'),
    helpers = require('broccoli-kitchen-sink-helpers'),
    Filter = require('broccoli-filter'),
    Buffer = require('buffer').Buffer,
    zopfli = require('node-zopfli');


ZopfliFilter.prototype = Object.create(Filter.prototype);
ZopfliFilter.prototype.constructor = ZopfliFilter;


/**
 * Zopfli filter.
 *
 * @constructor
 * @param {object} inputNode - Input node.
 * @param {object} options - Options.
 */
function ZopfliFilter(inputNode, options) {
    if (!(this instanceof ZopfliFilter))
        return new ZopfliFilter(inputNode, options);
    Filter.call(this, inputNode);

    options = options || {};

    this.zopfliOptions = {
        numiterations: options.numIterations || 15,
        blocksplitting: (options.blockSplitting === undefined ?
                         true :
                         options.blockSplitting),
        blocksplittinglast: !!options.blockSplittingLast,
        blocksplittingmax: (options.blockSplittingMax === undefined ?
                            15 :
                            options.blockSplittingMax)
    };
    this.keepUncompressed = options.keepUncompressed;
    this.appendSuffix = (options.hasOwnProperty('appendSuffix') ?
                         options.appendSuffix :
                         true);

    if (this.keepUncompressed && !this.appendSuffix) {
        throw new Error('Cannot keep uncompressed files without appending suffix. Filenames would be the same.');
    }
}

ZopfliFilter.prototype.processFile = function(srcDir, destDir, relativePath) {
    if (this.keepUncompressed) {
        helpers.copyPreserveSync(srcDir + '/' + relativePath,
                                 destDir + '/' + relativePath);
    }

    return Filter.prototype.processFile.apply(this, arguments);
};

ZopfliFilter.prototype.processString = function(str) {
    return RSVP.denodeify(zopfli.gzip)(new Buffer(str), this.zopfliOptions);
};

ZopfliFilter.prototype.getDestFilePath = function() {
    var destFilePath = Filter.prototype.getDestFilePath.apply(this, arguments);
    if (destFilePath) {
        return this.appendSuffix ? destFilePath + '.gz' : destFilePath;
    }
};

module.exports = ZopfliFilter;
