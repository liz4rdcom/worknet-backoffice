const _ = require('lodash')

function toObject(elasticHit) {
  let object = elasticHit._source

  object.id = elasticHit._id

  return object
}

const stringIsProbablyDouble = str => /^[0-9e.]+$/.test(str)

function isValidDate(date) {
  return _.isString(date) && new Date(date).toString() !== 'Invalid Date' && !Number.isInteger(date) && !stringIsProbablyDouble(date)
}

function buildElasticParametersQuery(parameters) {
  var queryStringArray = []

  for (var i = 0; i < parameters.length; i++) {
    var param = parameters[i]

    if (!param.condition) {
      queryStringArray.push(param.fieldName + ':' + param.value)
      continue
    }

    if (isValidDate(param.value)) {
      var formatedDate = new Date(param.value).toISOString().substring(0, 10)

      if (param.condition === '=') {
        queryStringArray.push(param.fieldName + ':' + formatedDate)
      } else {
        queryStringArray.push(param.fieldName + ':' + param.condition + formatedDate)
      }

      continue
    }

    if (param.condition === '=') {
      queryStringArray.push(param.fieldName + ':' + param.value)
    } else {
      queryStringArray.push(param.fieldName + ':' + param.condition + param.value)
    }
  }

  return queryStringArray.join(' AND ')
}

async function insertData(index, type, users, client) {
  if (users.length === 0) {
    return
  }

  let bulk = []
  let action = { index: { _index: index, _type: type } }

  users.forEach(item => bulk.push(action, item))

  return await client.bulk({
    body: bulk,
    refresh: true,
  })
}

module.exports = {
  toObject,
  buildElasticParametersQuery,
  insertData,
}
