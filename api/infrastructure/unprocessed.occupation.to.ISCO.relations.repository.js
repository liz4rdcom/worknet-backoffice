const elasticsearch = require('elasticsearch')
const config = require('config')
const utils = require('./utils')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const index = config.get('elastic.unprocessedOccupationToISCORelationsIndex')
const type = config.get('elastic.unprocessedOccupationToISCORelationsType')

async function search(queryString = '*') {
  const options = {
    index,
    type,
    q: '*' + queryString + '*',
    size: 10000,
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => ({ ...item._source, id: item._id }))
}

async function saveRelation(occupationName, ISCOId, id) {
  let options = {
    index,
    type,
    body: { occupationName },
    refresh: true,
  }

  if (ISCOId) {
    options.body.ISCOId = ISCOId
  }

  if (id) options.id = id

  let result = await client.index(options)

  return result._id
}

async function addRelations(relations) {
  return await utils.insertData(index, type, relations, client)
}

async function deleteRelation(id) {
  let options = {
    index,
    type,
    id,
    refresh: true,
  }

  return await client.delete(options)
}

async function findRelationByOccupation(occupationName) {
  const options = {
    index,
    type,
    body: {
      query: {
        bool: {
          must: {
            term: { 'occupationName.keyword': occupationName },
          },
        },
      },
    },
  }

  let result = (await client.search(options)).hits.hits

  if (result.length > 1) {
    throw new Error('internal error found more than one relations')
  }

  if (result.length === 0) {
    return undefined
  }

  return { ...result[0]._source, id: result[0]._id }
}

async function replaceByOccupationName(relation) {
  const foundRel = await findRelationByOccupation(relation.occupationName)

  if (!foundRel) {
    throw new Error('No unprocessed occupation to ISCO relation to replace.')
  }

  let options = {
    index,
    type,
    body: relation,
    id: foundRel.id,
    refresh: true,
  }

  return await client.index(options)
}

module.exports = {
  search,
  saveRelation,
  addRelations,
  deleteRelation,
  findRelationByOccupation,
  replaceByOccupationName,
}
