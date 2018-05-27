import axios from 'axios'
import utils from './utils'

// axios#request(config)
// axios#get(url[, config])
// axios#delete(url[, config])
// axios#head(url[, config])
// axios#options(url[, config])
// axios#post(url[, data[, config]])
// axios#put(url[, data[, config]])
// axios#patch(url[, data[, config]])

function request ({ needsToken = true, ...restConfig }) {
  const config = { ...restConfig }

  if (needsToken) {
    config.headers = utils.getHeaders()
  }

  return axios.request(config)
}

const webApi = {
  get: (url, config) => request({ url, method: 'get', ...config }),
  delete: (url, config) => request({ url, method: 'delete', ...config }),
  head: (url, config) => request({ url, method: 'head', ...config }),
  options: (url, config) => request({ url, method: 'options', ...config }),
  post: (url, data, config) => request({ url, method: 'post', data, ...config }),
  put: (url, data, config) => request({ url, method: 'put', data, ...config }),
  patch: (url, data, config) => request({ url, method: 'patch', data, ...config }),
  request,
}

export default webApi
