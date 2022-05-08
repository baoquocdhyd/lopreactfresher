import axios from 'axios'
// require('dotenv').config();

const instance = axios.create({
  baseURL: 'https://reqres.in',})
instance.interceptors.response.use((response) => {
  const { data } = response
  return response.data
}, function (error) {
  return Promise.reject(error);
})
export default instance


// process.env.REACT_APP_BACKEND_URL