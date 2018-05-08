function getHeaders () {
  return {
    username: 'root',
  }
}

const getRangeNumberArray = (start, end) => {
  const retVal = []

  for (let i = start; i < end + 1; i++) {
    retVal.push(i)
  }

  return retVal
}

export default {
  getHeaders,
  getRangeNumberArray,
}
