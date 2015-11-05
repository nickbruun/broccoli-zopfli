# Broccoli Zopfli gzip plugin

[![Build Status](https://travis-ci.org/nickbruun/broccoli-zopfli.svg?branch=master)](https://travis-ci.org/nickbruun/broccoli-zopfli) [![npm version](https://badge.fury.io/js/broccoli-zopfli.svg)](https://badge.fury.io/js/broccoli-zopfli)

Fork of [broccoli-gzip](https://github.com/salsify/broccoli-gzip) to use Zopfli instead of gzip to perform gzip compression. All credit goes to the original authors of broccoli-gzip.


## Installation

```bash
$ npm install broccoli-zopfli
```


## Example

```javascript
var zopfliGzipFiles = require('broccoli-zopfli');

var tree = zopfliGzipFiles('app', {
  extensions: ['js', 'css', 'svg']
});
```


## Configuration

### `zopfliGzipFiles(inputTree, options)`

---

`options.extensions` *{Array}* (required)

The file extensions that should be compressed.

---

`options.keepUncompressed` *{Boolean}* (optional, default `false`)

Whether to keep uncompressed versions of the files in the resulting tree.

---

`options.appendSuffix` *{Boolean}* (optional, default `true`)

Whether to append the `.gz` extension suffix to compressed files.

---

`options.numIterations` *{Number}* (optional, default `15`)

Maximum amount of times to rerun forward and backward pass to optimize LZ77 compression cost. Good values: 10, 15 for small files, 5 for files over several MB in size or it will be too slow.

---

`options.blockSplitting` *{Boolean}* (optional, default `true`) 

If true, splits the data in multiple deflate blocks with optimal choice for the block boundaries. Block splitting gives better compression.

---

`options.blockSplittingLast` *{Boolean}* (optional, default `false`) 

If true, chooses the optimal block split points only after doing the iterative LZ77 compression. If false, chooses the block split points first, then does iterative LZ77 on each individual block. Depending on the file, either first or last gives the best compression.

---

`options.blockSplittingMax` *{Number}* (optional, default `15`) 

Maximum amount of blocks to split into (0 for unlimited, but this can give extreme results that hurt compression on some files).


## License

broccoli-zopfli is, like broccoli-gzip, distributed under the MIT license.
