const { isExist, mkdir } = require('./utils').files;
const { log, error } = console;
const fs = require('fs');
const { save, has, get, getByKey } = require('./utils').store;
const pkg = require('./package.json');
const { message } = require('./utils').display;
const commands = require('./commands');

const pigen = {};
pigen.generate = async (createIn, structureName) => {
    try {
        commands.generate(createIn, structureName)
    } catch (ex) {
        error(ex);
    }
};

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
        const structures = get();
        const names = Object.keys(structures);
        message('info', `found ${names.length} saved structures!`)
        names.forEach((name, index) => {
            message('', `${name}`);
        });
    } catch (ex) {
        message('error', 'unexpected error happened!');
    }
}

pigen.help = () => {
    log(commands.help())
}

pigen.init = (isForced) => {
    commands.init(isForced);
}

module.exports = pigen;