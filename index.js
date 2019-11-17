#!/usr/bin/env node
const pigen = require('./pigen');
if (require.main === module) {
    pigen();
} else {
    module.exports = pigen;
}
