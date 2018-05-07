const userRepository = require('../infrastructure/user.repository')

async function getList(queryString) {
  return await userRepository.getUsers(queryString)
}

async function getById(id) {
  return await userRepository.getById(id)
}

async function advancedSearch(params) {
  return await userRepository.advancedSearch(params)
}

module.exports = {
  getList,
  getById,
  advancedSearch,
}
