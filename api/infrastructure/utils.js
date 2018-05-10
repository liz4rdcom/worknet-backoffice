function toObject(elasticHit) {
  let object = elasticHit._source

  object.id = elasticHit._id

  return object
}

function isValidDate(date) {
  return !Number(date) && new Date(date).toString() !== 'Invalid Date'
}

function buildElasticParametersQuery(parameters) { // todo date validation
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

module.exports = {
  toObject,
  buildElasticParametersQuery,
}
