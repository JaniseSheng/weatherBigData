import axios from 'axios';
import {hostUrl} from './config';

export const axiosPost = (url, params = {}) => {
  const _url = hostUrl + url;
  return axios.post(_url, params).then(function(response) {
    const res = response.data;
    return res
  })
}

export const axiosPatch = (url, params) => {
  const _url = hostUrl + url;
  return axios.patch(_url, params).then(function(response) {
    const res = response.data;
    return res
  })
}
export const axiosDel = (url, params = '') => {
  const _url = hostUrl + url + params;
  return axios.delete(_url).then(function(response) {
    const res = response.data;
    return res
  })
}
export const axiosGet = (url, params = '') => {
  const _url = hostUrl + url + params;
  return axios.get(_url).then(function(response) {
    const res = response.data;
    return res
  })
}
