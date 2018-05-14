import axios from 'axios'
import utils from './utils'

async function fetchFormalEducationLevels () {
  if (this.formalEducationLevels) return this.formalEducationLevels
  let response = await axios.get('api/libs/formalEducationLevels', {headers: utils.getHeaders()})
  this.formalEducationLevels = response.data
  return this.formalEducationLevels
}

export default {
  formalEducationLevels: undefined,
  fetchFormalEducationLevels,
}
