const _ = require('lodash')
const unprocessedOccupationToISCORelationsRepo = require('../infrastructure/unprocessed.occupation.to.ISCO.relations.repository')
const occupationInteractor = require('../infrastructure/occupation.repository')

async function getUnrelatedList() {
  const occupations = await occupationInteractor.search()
  const unprocessedOccupationToISCORelations = await unprocessedOccupationToISCORelationsRepo.search()

  console.log(55555533333, unprocessedOccupationToISCORelations)

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
  const occupations = await occupationInteractor.search()
  const unprocessedOccupationToISCORelations = await unprocessedOccupationToISCORelationsRepo.search()

  const relatedList = occupations
    .filter(nextOccup => nextOccup.ISCOId)
    .map(({ name, ...rest }) => ({ occupationName: name, ...rest }))

  unprocessedOccupationToISCORelations.forEach(nextUnprocOccup => {
    if (!nextUnprocOccup.ISCOId) {
      _.remove(relatedList, nextRelListItem => nextRelListItem.occupationName === nextUnprocOccup.occupationName)
    } else {
      relatedList.push({ occupationName: nextUnprocOccup.occupationName, ISCOId: nextUnprocOccup.ISCOId })
    }
  })

  return relatedList
}

module.exports = {
  getUnrelatedList,
  getRelatedList,
}
