import axios from 'axios';
import {SET_LOADING_STATE} from '../mutation-types'

const state = {
  isLoading: true
}

const mutations = {
  // 设置loading状态
  [SET_LOADING_STATE](state, bool) {
    state.isLoading = bool
  }
}

export default {
  state,
  mutations
}
