const { isExist, mkdir } = require('./utils').files;
const { generateDirectoriesTree } = require('./utils').utils;
const { log, error } = console;
const touch = require('touch');
const fs = require('fs');
const { save, has } = require('./utils').store;
const pkg = require('./package.json');
const { printLogo, message } = require('./utils').display;

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
                    message('success', `${name} created successfully!`);
                }
                if (files.length > 0) {
                    files.forEach(async file => {
                        const filePath = `${path}/${file}`;
                        if (!isExist(filePath)) {
                            touch.sync(filePath);
                            message('success', `${file} created successfully!`);
                        }
                    });
                }
            });
        } else {
            message('warning', 'not a pigen project')
        }
    } catch (ex) {
        if (String(ex) === 'SyntaxError: Unexpected end of JSON input') {
            message('error', 'invalid pigen file!')
            return;
        }
        message('error', 'unexpected error happened!')
        error(String(ex));
    }
}

pigen.save = async () => {
    try {
        const pigenFilePath = `${process.cwd()}/pigen.json`;
        if (isExist(pigenFilePath)) {
            const pigenFile = JSON.parse(fs.readFileSync(pigenFilePath, 'utf-8'));
            if (pigenFile.name) {
                if (!has(pigenFile.name)) {
                    save(pigenFile.name, pigenFile);
                    message('success', 'pigen project structure saved successfully!');
                    return;
                }
                message('error', `pigen project structure with the same name already exist!`);
            } else {
                message('error', 'to save your pigen config please add a name');
            }
        } else {
            message('error', "not a pigen project");
        }
    } catch (ex) {
        if (String(ex) === 'SyntaxError: Unexpected end of JSON input') {
            message('error', 'invalid pigen file!');
            return;
        }
        message('error', 'unexpected error happened!');
        error(String(ex));
    }
};

pigen.list = () => {
    try {

    } catch (ex) {
        message('error', 'unexpected error happened!');
    }
}

pigen.default = () => {
    try {
        printLogo(pkg)
    } catch (ex) {
        message('error', 'unexpected error happened!');
    }
};

module.exports = pigen;