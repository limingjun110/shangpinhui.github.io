import requests from './ajax'
import mockRequests from './mockAjax'
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
export const reqGetBannerList = () => mockRequests.get('/banner')
export const reqGetFloorList = () => mockRequests.get('/floor')
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
// 将产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
// 获取购物车列表数据接口
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })
// 删除购物产品的接口
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
// 修改商品的选中状态
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
// 获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
// 注册
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })
// 登陆
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })
// 获取用户的信息(带着用户的token向服务器要用户信息)
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
// 退出登陆
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })
// 获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
// 获取用户订单信息
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
// 提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
// 获取支付订单状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
// 获取个人中心的数据
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
