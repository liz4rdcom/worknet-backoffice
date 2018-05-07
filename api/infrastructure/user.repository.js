const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const utils = require('./utils')

const index = config.get('elastic.usersIndex')
const type = config.get('elastic.usersType')

async function getUsers(queryString) {
  let options = {
    index,
    type,
    q: !queryString ? '*' : '*' + queryString + '*',
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
}

async function getById(id) {
  const options = {
    index,
    type,
    id,
  }

  let result = await client.get(options)

  return utils.toObject(result)
}

async function advancedSearch(params = []) {
  let andBasedquery = utils.buildElasticParametersQuery(params)

  const options = {
    index,
    type,
    q: andBasedquery,
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
}

module.exports = {
  getUsers,
  getById,
  advancedSearch,
}
