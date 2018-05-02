const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const index = config.get('elastic.desirableTrainingsIndex')
const type = config.get('elastic.desirableTrainingsType')

async function search(queryString = '') {
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
