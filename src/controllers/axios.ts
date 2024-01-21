import axios from 'axios'
import { API } from '../config/config'

export const Axios = <T>(url: string, method: 'GET' | 'POST', body: object) => {
    return axios.request<T>({
        baseURL: API,
        url: url,
        method: method,
        data: { ...body, auth: import.meta.env.VITE_TOKEN }
    })
}
