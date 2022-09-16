import { v4 as uuidv4 } from 'uuid'
export const getUUID = () => {
  // eslint-disable-next-line camelcase
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // eslint-disable-next-line camelcase
  if (!uuid_token) {
    // eslint-disable-next-line camelcase
    uuid_token = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  // eslint-disable-next-line camelcase
  return uuid_token
}
