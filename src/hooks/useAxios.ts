import axios from 'axios'
import { API } from '../config/config'
import { useState } from 'react'

export const useAxios = <T>() => {
    const [isLoading, setLoading] = useState(true)
    const [response, setResponse] = useState<false | object | T>(false)

    const fetch = async (url: string, method: 'GET' | 'POST', body: object) => {
        setLoading(true)
        const { data } = await axios.request<T>({
            baseURL: API,
            url: url,
            method: method,
            data: { ...body, auth: import.meta.env.VITE_TOKEN }
        })
        setResponse(data)
        setLoading(false)
    }

    return [response, isLoading, fetch]
}
