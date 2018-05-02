const desirableJobRepo = require('../infrastructure/desirable.job.repository')

async function search(queryString) {
  return await desirableJobRepo.search(queryString)
}

module.exports = {
  search,
}
