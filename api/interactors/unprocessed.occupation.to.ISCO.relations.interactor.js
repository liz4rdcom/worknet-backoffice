const _ = require('lodash')
const occupationRepo = require('../infrastructure/occupation.repository')
const unprocessedOccupationToISCORelationsRepo = require('../infrastructure/unprocessed.occupation.to.ISCO.relations.repository')
const libRepository = require('../infrastructure/lib.repository')
const utils = require('../utils')

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
      return await unprocessedOccupationToISCORelationsRepo.saveRelation(occupationName)
    }
  }
}

async function addRelations(relations) {
  if (!_.isArray(relations)) {
    throw new Error('Relations is not array.')
  }

  const occupations = await occupationRepo.search()
  let ISCOList = await libRepository.getISCOList()

  relations.forEach(nextRelation => {
    const { occupationName, ISCOId, ...restRel } = nextRelation

    if (!_.isEmpty(restRel)) {
      throw new Error('Relations: redundant fields found.')
    }

    if (!_.isString(occupationName)) {
      throw new Error('Relations: occupation name is not string.')
    }

    if (_.find(occupations, nextOccup => nextOccup.name === occupationName) === undefined) {
      throw new Error('Relations: there is no such occupation name.')
    }

    if (!_.isNil(ISCOId)) {
      if (!_.isString(ISCOId)) {
        throw new Error('Relations: ISCOId is not string.')
      }

      if (ISCOId.length === 0) {
        throw new Error('Relations: ISCOId is empty string.')
      }

      if (_.find(ISCOList, nextISCO => nextISCO.id === ISCOId) === undefined) {
        throw new Error('Relations: there is no such ISCO id.')
      }
    }
  })

  if (utils.arrayHasDuplicate(relations)) {
    throw new Error('Relations has duplicate.')
  }

  const unprocessedOccupationToISCORelations = await unprocessedOccupationToISCORelationsRepo.search()

  const existingRels = []

  relations.forEach(async nextRelation => {
    if (_.find(unprocessedOccupationToISCORelations, nextUnproc => nextUnproc.occupationName === nextRelation.occupationName) !== undefined) {
      await unprocessedOccupationToISCORelationsRepo.replaceByOccupationName(nextRelation)
    } else {
      existingRels.push(nextRelation)
    }
  })

  return await unprocessedOccupationToISCORelationsRepo.addRelations(existingRels)
}

module.exports = {
  cancelRelation,
  addRelations,
}
