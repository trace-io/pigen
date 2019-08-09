const { isExist, mkdir } = require('./utils').files;
const { generateDirectoriesTree } = require('./utils').utils;
const { log, error } = console;
const touch = require('touch');

const pigen = {};
pigen.generate = async (createIn) => {
    try {
        if (isExist('./pigen.json')) {
            if (createIn !== './' && !isExist(createIn)) {
               await mkdir(createIn);
            }
            const pigenfile = require('./pigen.json');
            const tree = generateDirectoriesTree(pigenfile.dirs, createIn);
            tree.forEach(async ({ path, files, name }) => {
                if (!isExist(path)) {
                    await mkdir(path);
                    log(`${name} created successfully!`);
                }
                if (files.length > 0) {
                    files.forEach(async file => {
                        const filePath = `${path}/${file}`;
                        if (!isExist(filePath)) {
                            touch.sync(filePath);
                            log(`${file} created successfully!`);
                        }
                    });
                }
            });
        } else {
            log("no pigen file to generate");
        }
    } catch (ex) {
        error(ex);
    }
}

module.exports = pigen;