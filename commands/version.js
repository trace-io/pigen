const pkg = require('../package.json');
const { message } = require('../utils').display;
module.exports = () => {
    let version = pkg.version;
    message('info', `pigen version ${version}`);
}