#!/usr/bin/env node
const commands = require('./commands');

(async () => {
    const args = process.argv.slice(2);
    switch (args[0]) {
        case 'init':
        case 'i':
            if (args.includes('--force') || args.includes('-f')) {
                commands.init(true)
                return;
            }
            commands.init(false);
            break;
        case 'generate':
        case 'g':
            let createIn = '';
            if (args.includes('--in')) {
                let indexOfIn = args.indexOf('--in')
                const createdInName = args[indexOfIn + 1]
                createIn = createdInName ? `/${createdInName}` : createIn;
            }
            let structureName = '';
            if (args.includes('--from')) {
                let indexOfFrom = args.indexOf('--from')
                structureName = args[indexOfFrom + 1] ? args[indexOfFrom + 1] : ''
            }
            commands.generate(createIn, structureName);
            break;
        case 'save':
        case 's':
            commands.save();
            break;
        case 'list':
        case 'l':
            commands.list();
            break;
        case '--help':
        case '-h':
            commands.help();
            break;
        default:
            commands.help();
            break;
    }
})();
