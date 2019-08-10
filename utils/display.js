const { log, error, info, warn } = console;
const chalk = require('chalk');
const figlet = require('figlet');

const display = {};

display.printLogo = async pkg => {
    log(
        chalk.blue(
            figlet.textSync("P I G E N")
        )
    );
    log(chalk.red(`pigen version ${pkg["version"]}`));
};

display.message = (type, message = '') => {
    switch (type) {
        case 'error':
            error(`${chalk.bgBlack.red('ERROR!')} ${chalk.green(message)}`)
            break;
        case 'warning':
            warn(`${chalk.bgBlack.yellow('WARNING!')} ${chalk.green(message)}`)
            break;
        case 'info':
            info(`${chalk.bgBlack.blue('INFO!')} ${chalk.green(message)}`)
            break;
        case 'success':
            info(`${chalk.bgBlack.green('SUCCESS!')} ${chalk.green(message)}`)
            break;
        default:
            log(message);
            break;
    }
}
module.exports = display;