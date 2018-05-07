function toObject(elasticHit) {
  let object = elasticHit._source

  object.id = elasticHit._id

  return object
}

function buildElasticParametersQuery(parameters) {
  var queryStringArray = []

  for (var i = 0; i < parameters.length; i++) {
    var param = parameters[i]

    switch (param.fieldType) {
      case 'bool':
      case 'text':
        queryStringArray.push(param.fieldName + ':' + param.value)
        break
      case 'date':
        var formatedDate = new Date(param.value).toISOString().substring(0, 10)

        if (param.condition === '=') {
          queryStringArray.push(param.fieldName + ':' + formatedDate)
        } else {
          queryStringArray.push(param.fieldName + ':' + param.condition + formatedDate)
        }

        break
      case 'number':
        if (param.condition === '=') {
          queryStringArray.push(param.fieldName + ':' + param.value)
        } else {
          queryStringArray.push(param.fieldName + ':' + param.condition + param.value)
        }

        break
      case 'numberWithCombo':
        queryStringArray.push(param.fieldName + ':' + param.value)
        break
    }
  }

  return queryStringArray.join(' AND ')
}

module.exports = {
  toObject,
  buildElasticParametersQuery,
}
