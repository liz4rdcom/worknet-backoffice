const config = require('config')

const umpack = require('umpack-express')(config.get('um'))

module.exports = umpack
