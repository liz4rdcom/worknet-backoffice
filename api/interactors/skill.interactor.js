const skillRepo = require('../infrastructure/skill.repository')

async function search(queryString) {
  return await skillRepo.search(queryString)
}

module.exports = {
  search,
}
