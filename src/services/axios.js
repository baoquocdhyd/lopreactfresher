import axios from 'axios'
// require('dotenv').config();

const instance = axios.create({
  baseURL: 'https://reqres.in',
})
instance.interceptors.response.use(
  (response) => {
    const { data } = response
    console.log('Axios trả về', response)

    return response.data
  },
  function (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }

    return Promise.reject(error)
  }
)
export default instance

// process.env.REACT_APP_BACKEND_URL
//hoặc 'http://localhost:8080'