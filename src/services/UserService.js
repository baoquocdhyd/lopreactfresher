import axios from './axios.js'

const fetchAllUser = () => {
  return axios.get('/api/users?page=2')
}
export  {fetchAllUser}
