const _ = require('lodash')
const unprocessedOccupationToISCORelationsRepo = require('../infrastructure/unprocessed.occupation.to.ISCO.relations.repository')
const occupationRepo = require('../infrastructure/occupation.repository')

async function getUnrelatedList() {
  const occupations = await occupationRepo.search()
  const unprocessedOccupationToISCORelations = await unprocessedOccupationToISCORelationsRepo.search()

  const unrelatedList = occupations.filter(nextOccup => !nextOccup.ISCOId)

  unprocessedOccupationToISCORelations.forEach(nextUnprocOccup => {
    if (nextUnprocOccup.ISCOId) {
      _.remove(unrelatedList, nextUnrelListItem => nextUnrelListItem.name === nextUnprocOccup.occupationName)
    } else {
      unrelatedList.push({ name: nextUnprocOccup.occupationName })
    }
  })

  return unrelatedList
}

async function getRelatedList() {
  const occupations = await occupationRepo.search()
  const unprocessedOccupationToISCORelations = await unprocessedOccupationToISCORelationsRepo.search()

  const relatedList = occupations
    .filter(nextOccup => nextOccup.ISCOId)
    .map(({ name, ...rest }) => ({ occupationName: name, ...rest }))

  unprocessedOccupationToISCORelations.forEach(nextUnprocOccup => {
    _.remove(relatedList, nextRelListItem => nextRelListItem.occupationName === nextUnprocOccup.occupationName)

    if (nextUnprocOccup.ISCOId) {
      relatedList.push({ occupationName: nextUnprocOccup.occupationName, ISCOId: nextUnprocOccup.ISCOId })
    }
  })

  return relatedList
}

module.exports = {
  getUnrelatedList,
  getRelatedList,
}
