const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const utils = require('./utils')

const index = config.get('elastic.libIndex')
const type = config.get('elastic.locationType')
const educationTypesIndex = config.get('elastic.educationTypesIndex')
const educationTypesType = config.get('elastic.educationTypesType')
const educationLevelIndex = config.get('elastic.educationLevelIndex')
const educationLevelType = config.get('elastic.educationLevelType')
const formalEducationLevelIndex = config.get('elastic.formalEducationLevelIndex')
const formalEducationLevelType = config.get('elastic.formalEducationLevelType')
const languagesIndex = config.get('elastic.languagesIndex')
const languagesType = config.get('elastic.languagesType')
const ISCOListIndex = config.get('elastic.ISCOListIndex')
const ISCOListType = config.get('elastic.ISCOListType')

async function getLocationsInGeorgia() {
  let options = {
    index,
    type,
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
}

async function getEducationTypes() {
  let options = {
    index: educationTypesIndex,
    type: educationTypesType,
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source.name)
}

async function getEducationLevels() {
  let options = {
    index: educationLevelIndex,
    type: educationLevelType,
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source.name)
}

async function getFormalEducationLevels() {
  let options = {
    index: formalEducationLevelIndex,
    type: formalEducationLevelType,
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source.name)
}

async function getLanguages() {
  let options = {
    index: languagesIndex,
    type: languagesType,
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source.name)
}

async function getISCOList() {
  let options = {
    index: ISCOListIndex,
    type: ISCOListType,
    size: 10000,
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source)
}

module.exports = {
  getLocationsInGeorgia,
  getEducationTypes,
  getEducationLevels,
  getFormalEducationLevels,
  getLanguages,
  getISCOList,
}
