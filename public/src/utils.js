import Cookies from 'js-cookie'

function getHeaders () {
  return {
    authorization: Cookies.get('token'),
  }
}

const getRangeNumberArray = (start, end) => {
  const retVal = []

  for (let i = start; i < end + 1; i++) {
    retVal.push(i)
  }

  return retVal
}

const userAdvancedSearchParamsToApi = userAdvancedSearchParamsList => (
  userAdvancedSearchParamsList
    .filter(({ active }) => active)
    .reduce((acc, curr) => {
      if (curr.id === 'ageRange') {
        let retVal = [...acc]

        const nowDate = new Date()

        if (curr.value.startValue) {
          retVal = [...retVal, {
            id: 'birthDate',
            name: 'param-date',
            value: {
              comparSign: '<=',
              dateVal: new Date(nowDate.getFullYear() - curr.value.startValue, nowDate.getMonth(), nowDate.getDate()).toString(),
            },
          }]
        }

        if (curr.value.endValue) {
          retVal = [...retVal, {
            id: 'birthDate',
            name: 'param-date',
            value: {
              comparSign: '>=',
              dateVal: new Date(nowDate.getFullYear() - curr.value.endValue, nowDate.getMonth(), nowDate.getDate()).toString(),
            },
          }]
        }

        return retVal
      }

      return [...acc, curr]
    }, [])
    .map(({ id, name, value, additionalProps }) => {
      const retVal = {
        fieldName: id,
      }

      if (value.comparSign) {
        retVal.condition = value.comparSign

        if (value.dateVal) {
          retVal.value = value.dateVal
        } else {
          retVal.value = value.numInput
        }
      } else if (value.comparSign !== null) {
        retVal.value = value
      }

      return retVal
    })
)

const vacancyAdvancedSearchParamsToApi = vacancyAdvancedSearchParamsList => {
  console.log('bbb', vacancyAdvancedSearchParamsList)

  const aaa = vacancyAdvancedSearchParamsList
    .filter(({ active }) => active)
    .map(({ id, name, value, additionalProps }) => {
      const retVal = {
        fieldName: id,
      }

      if (value.comparSign) {
        retVal.condition = value.comparSign

        if (value.dateVal) {
          retVal.value = value.dateVal
        } else {
          retVal.value = value.numInput
        }
      } else if (value.comparSign !== null) {
        retVal.value = value
      }

      return retVal
    })

  console.log('aaaaaaaaaaaaa', aaa)

  return aaa
}

const getConditionalValue = (...checkArgs) => (...resultArgs) => k => {
  if (checkArgs.length !== resultArgs.length || checkArgs.length === 0) {
    return undefined
  }

  let i
  for (i = 0; i < checkArgs.length; i++) {
    if (checkArgs[i] === k) {
      return resultArgs[i]
    }
  }

  return undefined
}

const isValidEmail = str => /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/i.test(str)

export default {
  getHeaders,
  getRangeNumberArray,
  userAdvancedSearchParamsToApi,
  vacancyAdvancedSearchParamsToApi,
  getConditionalValue,
  isValidEmail,
}
