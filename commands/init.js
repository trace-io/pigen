const { isExist } = require('../utils').files;
const { message } = require('../utils').display;
const touch = require('touch');
const fs = require('fs');

const createAndInit = () => {
    touch.sync('pigen.json');
    fs.writeFileSync('./pigen.json', JSON.stringify({
        dirs: [],
        files: []
    }, null, 3))
}

module.exports = (isForced) => {
    const pigenFilePath = `${process.cwd()}/pigen.json`;
    if (isExist(pigenFilePath)) {
        if (isForced) {
            // touch.sync('pigen.json');
            createAndInit();
            message('info', 'ReInitialized empty pigen.json file!')
        } else {
            message('warning', 'pigen already exist');
            message('info', 'use --force to reinitialize!')
        }
    } else {
        // touch.sync('pigen.json');
        createAndInit();
        message('info', 'Initialized empty pigen.json file!')
    }
};