const { isExist } = require('../utils').files;
const { error } = console;
const fs = require('fs');
const { save, has } = require('../utils').store;
const { message } = require('../utils').display;

module.exports = () => {
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
}