const { isExist, mkdir } = require('./utils').files;
const { generateDirectoriesTree } = require('./utils').utils;
const { log, error } = console;
const touch = require('touch');
const fs = require('fs');

const pigen = {};
pigen.generate = async (createIn) => {
    try {
        const pigenFilePath = `${process.cwd()}/pigen.json`;
        if (isExist(pigenFilePath)) {
            if (createIn !== './' && !isExist(createIn)) {
               await mkdir(createIn);
            }
            const pigenFile = JSON.parse(fs.readFileSync(pigenFilePath, 'utf-8'));
            const tree = generateDirectoriesTree(pigenFile.dirs || [], createIn);
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
        if (String(ex) === 'SyntaxError: Unexpected end of JSON input') {
            log('[error] Invalid pigen file!');
            return;
        }
        error(String(ex));

    }
}

module.exports = pigen;