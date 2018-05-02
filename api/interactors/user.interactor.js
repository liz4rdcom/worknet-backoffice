const userRepository = require('../infrastructure/user.repository')

async function getList() {
  return await userRepository.getUsers()
}

async function getById(id) {
  return await userRepository.getById(id)
}

module.exports = {
  getList,
  getById,
}
