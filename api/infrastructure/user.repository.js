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

async function edit(id, user) {
  const currentUser = await getById(id)

  let options = {
    index,
    type,
    body: { ...currentUser, ...user },
    id: id,
  }

  await client.index(options)
}

async function advancedSearch(params = []) {
  const textQuery = params.find(({ fieldName }) => fieldName === '$text$')
  const advancedParams = params.filter(({ fieldName }) => fieldName !== '$text$')

  let andBasedquery = utils.buildElasticParametersQuery(advancedParams)

  const options = {
    index,
    type,
    body: {
      query: {
        bool: {
          must: [],
        },
      },
    },
    size: 30,
  }

  if (textQuery) {
    options.body.query.bool.must.push({
      'query_string': {
        query: textQuery.value,
      },
    })
  }

  if (advancedParams.length !== 0) {
    options.body.query.bool.must.push({
      'query_string': {
        query: andBasedquery,
      },
    })
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
}

module.exports = {
  getUsers,
  getById,
  edit,
  advancedSearch,
}
