#!/usr/bin/env node
const pigen = require('./pigen');

(async () => {
    const args = process.argv.slice(2);
    switch (args[0]) {
        case '--generate':
        case '-g':
            let createIn = './';
            if (args.includes('--in')) {
                createIn = args[2] ? `./${args[2]}` : createIn;
            }
            pigen.generate(createIn);
            break;
        case '--save':
        case '-s':
            pigen.save();
            break;
        default:
            pigen.default();
            break;
    }
})();
