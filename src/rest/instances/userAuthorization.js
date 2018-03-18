import axios from 'axios'
// const path = 'https://vue-http-c1b43.firebaseio.com/'
const instance = axios.create({
  baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
})
export default instance
