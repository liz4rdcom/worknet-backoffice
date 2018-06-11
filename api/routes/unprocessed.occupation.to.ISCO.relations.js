const router = require('express').Router()
const isAuthorized = require('../umpack').isAuthorized
const unprocessedOccupationToISCORelationsInter = require('../interactors/unprocessed.occupation.to.ISCO.relations.interactor')

const baseUrl = '/api/unprocessedOccupationToISCORelations'

router.post('/cancelRelation', isAuthorized, async (req, res, next) => {
  try {
    let result = await unprocessedOccupationToISCORelationsInter.cancelRelation(req.body.occupationName)

    console.log(4444445555555555555, req.body.occupationName)

    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl,
}
