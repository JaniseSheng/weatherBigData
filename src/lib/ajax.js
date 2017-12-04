import axios from 'axios';
import {hostUrl} from './config';
import Message from '~/iview/src/components/message'
import store from '@/vuex/store.js'

export const axiosPost = (url, params = {}, isLoading = true) => {
  const _url = hostUrl + url;
  isLoading && store.dispatch('set_loading_state', true)
  return axios.post(_url, params).then(function(response) {
    const res = response.data;
    store.dispatch('set_loading_state', false)
    return res
  }).catch(err=> {
    Message.error('数据请求失败， 请重试！')
    store.dispatch('set_loading_state', false)
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
