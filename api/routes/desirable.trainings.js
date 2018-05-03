const router = require('express').Router()
const desirableTrainingInteractor = require('../interactors/desirable.training.interactor')

const baseUrl = '/api/desirableTrainings'

router.get('/search', async (req, res, next) => {
  try {
    let result = await desirableTrainingInteractor.search(req.query.query)
    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl,
}
