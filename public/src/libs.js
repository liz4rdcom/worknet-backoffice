import webApi from './webApi'

async function fetchFormalEducationLevels () {
  if (this.formalEducationLevels) return this.formalEducationLevels
  let response = await webApi.get('api/libs/formalEducationLevels')
  this.formalEducationLevels = response.data
  return this.formalEducationLevels
}

export default {
  formalEducationLevels: undefined,
  fetchFormalEducationLevels,
}
