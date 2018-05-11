const router = require('express').Router()

const baseUrl = '/api/vacancies'

const vacancyInteractor = require('../interactors/vacancy.interactor')
const utils = require('../utils')

router.get('/', async (req, res, next) => {
  try {
    let result = await vacancyInteractor.getList(req.query.query)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/own', async (req, res, next) => {
  const userName = utils.getUserNameFromRequest(req)

  try {
    let result = await vacancyInteractor.getUserVacancies(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/advancedSearch', async (req, res, next) => {
  try {
    let result = await vacancyInteractor.advancedSearch(req.body)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let result = await vacancyInteractor.getById(req.params.id)

    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl,
}
