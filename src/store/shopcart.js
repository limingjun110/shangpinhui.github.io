import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api'

const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    const result = await reqCartList()
    if (result.code === 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    const result = await reqDeleteCartById(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateCheckedByid(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    const PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      const promise = item.isChecked === 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      PromiseAll.push(promise)
    })
    return PromiseAll.push(PromiseAll)
  },
  // 修改全部产品的状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    const promiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      const promise = dispatch('updateCheckedById', {
        skuId: item.skuId,
        isChecked
      })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
