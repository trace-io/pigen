const { existsSync } = require('fs');
const mkdirp = require('mkdirp');

const files = {};

files.mkdir = (dir) => mkdirp.sync(dir);

files.isExist = (dir) => existsSync(dir);

module.exports = files;
