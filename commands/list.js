const { get } = require('../utils').store;
const { message } = require('../utils').display;

module.exports = () => {
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