const _ = require('lodash')
const occupationRepo = require('../infrastructure/occupation.repository')
const unprocessedOccupationToISCORelationsRepo = require('../infrastructure/unprocessed.occupation.to.ISCO.relations.repository')

async function cancelRelation(occupationName) {
  const occupations = await occupationRepo.search()

  const unprocessedOccupationToISCORelations = await unprocessedOccupationToISCORelationsRepo.search()

  const foundUnproc = _.find(unprocessedOccupationToISCORelations, nextUnproc => nextUnproc.occupationName === occupationName)
  const foundOccup = _.find(occupations, nextOccup => nextOccup.name === occupationName)

  if ((!foundOccup.ISCOId && !foundUnproc) || (foundUnproc && !foundUnproc.ISCOId)) {
    return
  }

  if (foundUnproc !== undefined) {
    if (foundUnproc.ISCOId) {
      if (foundOccup.ISCOId) {
        return await unprocessedOccupationToISCORelationsRepo.replaceByOccupationName({ occupationName })
      } else {
        return await unprocessedOccupationToISCORelationsRepo.deleteRelation(foundUnproc.id)
      }
    }
  } else if (foundOccup.ISCOId) {
    const foundRelation = await unprocessedOccupationToISCORelationsRepo.findRelationByOccupation(occupationName)

    if (!foundRelation) {
      return await unprocessedOccupationToISCORelationsRepo.addRelation(occupationName)
    }
  }
}

module.exports = {
  cancelRelation,
}
