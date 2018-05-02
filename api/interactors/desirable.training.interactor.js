const desirableTrainingRepo = require('../infrastructure/desirable.training.repository')

async function search(queryString) {
  return await desirableTrainingRepo.search(queryString)
}

module.exports = {
  search,
}
