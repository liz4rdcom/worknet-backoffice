const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const utils = require('./utils')

const index = config.get('elastic.vacanciesIndex')
const type = config.get('elastic.vacanciesType')

async function getVacancies(query = '') {
  let options = {
    index,
    type,
    q: '*' + query + '*',
    searchType: 'dfs_query_then_fetch',
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

async function getByAuthorUserName(userName) {
  const options = {
    index,
    type,
    q: `authorUserName:${userName}`,
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
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
    size: 1000,
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
  getVacancies,
  getById,
  getByAuthorUserName,
  advancedSearch,
}
