const _ = require('lodash')

const jwt = require('jsonwebtoken')

function getUserNameFromRequest(req) {
  return jwt.decode(req.headers.authorization).user
}

function arrayHasDuplicate(arr, iteratee) {
  return _.uniqBy(arr, iteratee).length !== arr.length
}

module.exports = {
  getUserNameFromRequest,
  arrayHasDuplicate,
}
