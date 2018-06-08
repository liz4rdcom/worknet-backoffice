const router = require('express').Router()
const isAuthorized = require('../umpack').isAuthorized
const latestOccupationsToISCORelations = require('../interactors/latest.occupations.to.ISCO.relations.interactor')

const baseUrl = '/api/latestOccupationsToISCORelations'

router.get('/unrelatedList', isAuthorized, async (req, res, next) => {
  try {
    let result = await latestOccupationsToISCORelations.getUnrelatedList()

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/relatedList', isAuthorized, async (req, res, next) => {
  try {
    let result = await latestOccupationsToISCORelations.getRelatedList()

    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl,
}
