[![npm version](https://img.shields.io/npm/v/@floatboth/broccoli-zopfli.svg)](https://www.npmjs.com/package/@floatboth/broccoli-zopfli)
[![npm downloads](https://img.shields.io/npm/dt/@floatboth/broccoli-zopfli.svg)](https://www.npmjs.com/package/@floatboth/broccoli-zopfli)
[![Build Status](https://travis-ci.org/myfreeweb/broccoli-zopfli.svg?branch=master)](https://travis-ci.org/myfreeweb/broccoli-zopfli)
[![MIT License](https://img.shields.io/badge/mit-license-green.svg?style=flat)](https://mit-license.org/)

# Broccoli Zopfli gzip plugin

Fork of [broccoli-gzip](https://github.com/salsify/broccoli-gzip) to use Zopfli instead of gzip to perform gzip compression. All credit goes to the original authors of broccoli-gzip.

This version is compatible with Broccoli 1.x.

Uses [WebAssembly compiled Zopfli](https://github.com/gfx/universal-zopfli-js) to avoid all the native compilation.

## Installation

```bash
$ npm i @floatboth/broccoli-zopfli
```


## Example

```javascript
const zopfliGzipFiles = require('@floatboth/broccoli-zopfli')

const tree = zopfliGzipFiles('app', {
  extensions: ['js', 'css', 'svg']
})
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

`options.blockSplittingMax` *{Number}* (optional, default `15`) 

Maximum amount of blocks to split into (0 for unlimited, but this can give extreme results that hurt compression on some files).


## License

broccoli-zopfli is, like broccoli-gzip, distributed under the MIT license.
