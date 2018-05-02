const router = require('express').Router()
const userInteractor = require('../interactors/user.interactor')

const baseUrl = '/api/users'

router.get('/', async (req, res, next) => {
  try {
    let result = await userInteractor.getList()

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let result = await userInteractor.getById(req.params.id)

    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl,
}
