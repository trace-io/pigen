const { existsSync } = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const files = {};

files.mkdir = async (dir) => await exec(`mkdir ${dir}`);

files.isExist = (dir) => existsSync(dir);

module.exports = files;
