const _ = require('lodash')
const unprocessedOccupationToISCORelationsRepo = require('../infrastructure/unprocessed.occupation.to.ISCO.relations.repository')

async function cancelRelation(occupationName) {
  const unprocessedOccupationToISCORelations = await unprocessedOccupationToISCORelationsRepo.search()

  const foundUnproc = _.find(unprocessedOccupationToISCORelations, nextUnproc => nextUnproc.occupationName === occupationName)

  if (foundUnproc !== undefined) {
    if (foundUnproc.ISCOId) {
      return await unprocessedOccupationToISCORelationsRepo.replaceByOccupationName({ occupationName })
    }
  } else {
    return await unprocessedOccupationToISCORelationsRepo.addRelation(occupationName)
  }
}

module.exports = {
  cancelRelation,
}
