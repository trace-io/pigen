const ConfigStore = require('configstore');
const pkg = require('../package.json');

const db = new ConfigStore(pkg.name);

const store = {};
store.save = (key, value) => db.set(key, value);

store.delete = (key) => db.delete(key);

store.has = (key) => db.has(key);

store.get = () => db.all;

store.getByKey = (key) => db.get(key);

module.exports = store;