// 储存token
export const setToken = (token) => {
  localStorage.setItem('TOKEN', token)
}
// 获取token
export const getToken = () => {
  return localStorage.getItem('TOKEN')
}
// 清除本地储存的token
export const removeToken = () => {
  localStorage.removeItem('TOKEN')
}
