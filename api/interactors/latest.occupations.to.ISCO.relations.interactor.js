const _ = require('lodash')
const unprocessedOccupationToISCORelationsRepo = require('../infrastructure/unprocessed.occupation.to.ISCO.relations.repository')
const occupationInteractor = require('../infrastructure/occupation.repository')
const libRepository = require('../infrastructure/lib.repository')

async function getUnrelatedList(occupationName, ISCOId) {
  const unprocessedOccupationToISCORelations = await unprocessedOccupationToISCORelationsRepo.search()
  const occupations = await occupationInteractor.search()
  const ISCOList = await libRepository.getISCOList()

  console.log(11111111111111, unprocessedOccupationToISCORelations)
  console.log(22222222222222, occupations)
  console.log(33333333333333, ISCOList)
}

async function getRelatedList(id) {
}

module.exports = {
  getUnrelatedList,
  getRelatedList,
}
