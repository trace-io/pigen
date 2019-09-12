const { mkdir, isExist } = require('../utils').files;
const touch = require('touch');
const { generateDirectoriesTree } = require('../utils').utils;
const { message } = require('../utils').display;
const store = require('../utils').store;
const fs = require('fs');

const addToPigen = (tree) => {
    const pigenFilePath = `${process.cwd()}/pigen.json`;
    if (isExist(pigenFilePath)) {
        fs.writeFileSync('./pigen.json', JSON.stringify(tree, null, 3));
        return;
    }
    touch.sync('./pigen.json')
    fs.writeFileSync('./pigen.json', JSON.stringify(tree, null, 3));
}

const generate = (tree) => {
    try {
        tree.forEach(({ path, files, name }) => {
            path = process.cwd() + path;
            if (!isExist(path)) {
                mkdir(path);
                message('', `${name} created successfully!`);
            }
            if (files.length > 0) {
                files.forEach(file => {
                    const filePath = `${path}/${file}`;
                    if (!isExist(filePath)) {
                        touch.sync(filePath);
                        message('success', `${file} created successfully!`);
                    }
                });
            }
        });
    } catch (ex) {
        console.error(ex);
    }

}

module.exports = (createIn, structureName) => {
    try {
        if (createIn !== '' && !isExist(createIn)) {
            mkdir(createIn);
        }
        // generate project structure from a saved list
        if (structureName) {
            const structure = store.getByKey(structureName);
            if (structure) {
                const tree = generateDirectoriesTree(structure.dirs || [], createIn);
                generate(tree);
                addToPigen(structure);
            } else {
                message('error', 'invalid project structure name!')
            }
        } else {
            const pigenFilePath = `${process.cwd()}/pigen.json`;
            if (isExist(pigenFilePath)) {
                const pigenFile = JSON.parse(fs.readFileSync(pigenFilePath, 'utf-8'));
                const tree = generateDirectoriesTree(pigenFile.dirs || [], createIn);
                generate(tree);
            } else {
                message('warning', 'not a pigen project')
            }
        }
    } catch (ex) {
        if (String(ex) === 'SyntaxError: Unexpected end of JSON input') {
            message('error', 'invalid pigen file!')
            return;
        }
        message('error', 'unexpected error happened!')
        console.error(String(ex));
    }
}