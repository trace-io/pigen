const { log } = console;
const chalk = require('chalk');
const figlet = require('figlet');

const display = {};

display.printLogo = async pkg => {
    log(
        chalk.blue(
            figlet.textSync("Pigen", {
                horizontalLayout: "full"
            })
        )
    );
    log(chalk.red(`Pigen version ${pkg["version"]}`));
};

display.message = (type, message = '') => {
    switch (type) {
        case 'error':
            log(`${chalk.bgBlack.red('ERROR!')} ${chalk.green(message)}`)
            break;
        case 'warning':
            log(`${chalk.bgBlack.yellow('WARNING!')} ${chalk.green(message)}`)
            break;
        case 'info':
            log(`${chalk.bgBlack.blue('INFO!')} ${chalk.green(message)}`)
            break;
        case 'success':
            log(`${chalk.bgBlack.green('SUCCESS!')} ${chalk.green(message)}`)
            break;
        default:
            log(message)
            break;
    }
}
module.exports = display;