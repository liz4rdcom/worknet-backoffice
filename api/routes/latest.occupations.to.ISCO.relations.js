const router = require('express').Router()
const isAuthorized = require('../umpack').isAuthorized
const latestOccupationsToISCORelations = require('../interactors/latest.occupations.to.ISCO.relations.interactor')

const baseUrl = '/api/latestOccupationsToISCORelations'

router.get('/unrelatedList', isAuthorized, async (req, res, next) => {
  try {
    let result = await latestOccupationsToISCORelations.getUnrelatedList(req.query.query)

    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl,
}
