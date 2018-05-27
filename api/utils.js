const jwt = require('jsonwebtoken')

function getUserNameFromRequest(req) {
  return jwt.decode(req.headers.authorization).user
}

module.exports = {
  getUserNameFromRequest,
}
