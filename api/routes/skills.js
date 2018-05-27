const router = require('express').Router()
const skillInteractor = require('../interactors/skill.interactor')
const isAuthorized = require('../umpack').isAuthorized

const baseUrl = '/api/skills'

router.get('/search', isAuthorized, async (req, res, next) => {
  try {
    let result = await skillInteractor.search(req.query.query)
    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl,
}
