const { sign, verify } = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const util = require('util');

const jwt = {
    sign: util.promisify(jsonwebtoken.sign),
    verify: util.promisify(jsonwebtoken.verify)
};

module.exports = jwt