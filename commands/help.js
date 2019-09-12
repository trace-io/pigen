const commandLineUsage = require('command-line-usage');
const { log } = console;

module.exports = () => {
    const sections = [
        {
            header: 'pigen',
            content: 'Generate your project structure in one command.'
        },
        {
            header: 'Synopsis',
            content: '$ pigen <command> <options>'
        },
        {
            header: "Command List",
            content: [
                {
                    name: 'init',
                    description: "Create an empty pigen.json file or reinitialize an existing one",
                },
                {
                    name: 'generate',
                    description: "Generate a project structure defined in pigen.json.",
                },
                {
                    name: 'save',
                    description: "Save a project structure defined in pigen.json for later use.",
                },
                {
                    name: 'list',
                    description: "List all project structures saved for later use.",
                }
            ]
        },
        {
            header: 'Global Options',
            optionList: [
                {
                    name: 'in',
                    description: 'choose directory name to generate in.'
                },
                {
                    name: 'force',
                    alias: 'f',
                    description: 'force pigen operation.'
                },
                {
                    name: 'help',
                    alias: 'h',
                    description: 'Show help.'
                }
            ]
        }
    ]
    log(commandLineUsage(sections))
};