import axios from 'axios'
import loginApi from './api.config'

export const login = params => {
    
    return axios.post(loginApi, params)
}