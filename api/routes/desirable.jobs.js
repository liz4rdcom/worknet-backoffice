const router = require('express').Router()
const desirableJobInteractor = require('../interactors/desirable.job.interactor')

const baseUrl = '/api/desirableJobs'

router.get('/search', async (req, res, next) => {
  try {
    let result = await desirableJobInteractor.search(req.query.query)
    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl,
}
