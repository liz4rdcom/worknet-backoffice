function getUserNameFromRequest(req) {
  return req.headers.username
}

module.exports = {
  getUserNameFromRequest,
}
