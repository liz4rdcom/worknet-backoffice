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

async function setApproved(id, value) {
  return await userRepository.edit(id, { approvedByMediationService: value })
}

module.exports = {
  getList,
  getById,
  advancedSearch,
  setApproved,
}
