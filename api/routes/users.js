const router = require('express').Router()
const userInteractor = require('../interactors/user.interactor')
const isAuthorized = require('../umpack').isAuthorized

const baseUrl = '/api/users'

router.get('/', isAuthorized, async (req, res, next) => {
  try {
    let result = await userInteractor.getList(req.query.query)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/advancedSearch', isAuthorized, async (req, res, next) => {
  try {
    let result = await userInteractor.advancedSearch(req.body)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/:id', isAuthorized, async (req, res, next) => {
  try {
    let result = await userInteractor.getById(req.params.id)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.put('/setApproved/:id', isAuthorized, async (req, res, next) => {
  try {
    let result = await userInteractor.setApproved(req.params.id, req.body.value)

    next({ result })
  } catch (error) {
    next({ error })
  }
})

module.exports = {
  router,
  baseUrl,
}
