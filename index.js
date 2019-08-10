#!/usr/bin/env node
const pigen = require('./pigen');

(async () => {
    const args = process.argv.slice(2);
    switch (args[0]) {
        case 'init':
        case 'i':
            if (args.includes('--force') || args.includes('-f')) {
                pigen.init(true);
                return;
            }
            pigen.init(false);
            break;
        case 'generate':
        case 'g':
            let createIn = './';
            if (args.includes('--in')) {
                let indexOfIn = args.indexOf('--in')
                const createdInName = args[indexOfIn + 1]
                createIn = createdInName ? `./${createdInName}` : createIn;
            }
            let structureName = '';
            if (args.includes('--from')) {
                let indexOfFrom = args.indexOf('--from')
                structureName = args[indexOfFrom + 1] ? args[indexOfFrom + 1] : ''
            }
            pigen.generate(createIn, structureName);
            break;
        case 'save':
        case 's':
            pigen.save();
            break;
        case 'list':
        case 'l':
            pigen.list();
            break;
        case '--help':
        case '-h':
            pigen.help();
            break;
        default:
            pigen.help();
            break;
    }
})();
