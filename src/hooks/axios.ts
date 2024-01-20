import axios from 'axios'
import { API } from '../config/config'

export const Axios = <T>(url: string, method: 'GET' | 'POST', body: object) => {
    return axios.request<T>({
        baseURL: API,
        url: url,
        method: method,
        data: {
            ...body,
            auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.O0FKaqhJjEZgCAVfZoLz6Pjd7Gs9Kv6qi0P8RyATjaE'
        }
    })
}
