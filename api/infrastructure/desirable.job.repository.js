const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const index = config.get('elastic.desirableJobsIndex')
const type = config.get('elastic.desirableJobsType')

async function search(queryString) {
  queryString = queryString || '*'

  const options = {
    index,
    type,
    q: '*' + queryString + '*',
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source.name)
}

module.exports = {
  search,
}
