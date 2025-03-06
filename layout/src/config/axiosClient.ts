import axios from 'axios'
import { API_SERVER } from './constants'

const client = axios.create({
  baseURL: API_SERVER,
})

client.interceptors.response.use((resp) => resp.data)

export default client
