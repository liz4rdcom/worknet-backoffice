const vacancyRepository = require('../infrastructure/vacancy.repository')

async function getList(queryString) {
  return await vacancyRepository.getVacancies(queryString)
}

async function getById(id) {
  return await vacancyRepository.getById(id)
}

async function getUserVacancies(userName) {
  return await vacancyRepository.getByAuthorUserName(userName)
}

async function advancedSearch(params) {
  return await vacancyRepository.advancedSearch(params)
}

module.exports = {
  getList,
  getUserVacancies,
  getById,
  advancedSearch,
}
