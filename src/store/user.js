import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token.js'

const state = {
  code: '',
  token: getToken(),
  userInfo: ''
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    const result = await reqGetCode(phone)
    commit('GETCODE', result.data)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    const result = await reqUserRegister(user)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 登陆业务
  async userLogin({ commit }, data) {
    const result = await reqUserLogin(data)
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      // 持久化存储token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
    }
  },
  async userLogoout({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }

}
const gettrts = {}
export default {
  state,
  mutations,
  actions,
  gettrts
}
