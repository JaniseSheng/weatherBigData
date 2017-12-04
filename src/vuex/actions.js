import * as types from './mutation-types'

const makeAction = (type) => {
  return ({ commit }, ...args) => commit(type, ...args)
}
// ------------------- 设置loading状态 -------------------------
export const set_loading_state = makeAction(types.SET_LOADING_STATE)
