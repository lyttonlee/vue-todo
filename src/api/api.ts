import axios from 'axios';
import sha1 from 'sha1';
const AppId = 'A6097530712543'
const AppKey = '8070D7AF-8778-9151-F8C8-2DFCC36F8DF5'
const now = Date.now()
const http = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api',
  timeout: 10000,
});
http.interceptors.request.use((config: any) => {
  config.headers = {
    'X-APICloud-AppId': AppId,
    'X-APICloud-AppKey': `${sha1(`${AppId}UZ${AppKey}UZ${now}`)}.${now}`,
  }
  return config
})
export default http
