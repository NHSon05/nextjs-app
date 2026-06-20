import envConfig from "@/config"
import { NonUndefined } from "react-hook-form"

type CustomOptions = RequestInit & {
    baseUrl?: string
}

class HttpError extends Error {
    status: number
    payload: any

    constructor({status, payload} : {status: number, payload: any}) {
        super('Http Error')
        this.status = status
        this.payload = payload
    }
}

class SessionToken {
    private token = ''
    get value(){
        return this.token
    }
    set value(token: string) {
        if (typeof window === 'undefined') {
            return
        }
        this.token = token
    }
}

export const sessionToken = new SessionToken()

const request = async <Response>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options? : CustomOptions | undefined
) => {
    const body = options?.body ? JSON.stringify(options.body) : undefined
    const baseHeader = {
        'Content-Type': 'application/json',
    }
    // nếu không truyền base Urrl hoặc baseurl == undefined thì lấy từ envConfig.NEXT
    // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc tra gọi api đến nextjs server
    const baseUrl =
        options?.baseUrl === undefined
        ? envConfig.NEXT_PUBLIC_API_ENDPOINT
        : options.baseUrl

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

    const  res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeader,
            ...options?.headers
        },
        body,
        method
    })
    const payload: Response = await res.json()
    const data = {
        status: res.status,
        payload
    }
    if (!res.ok)
    {
        throw new HttpError(data)
    }
    return data
} 

export const http = {
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('GET', url, options)
    },
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined ) {
        return request<Response>('POST', url, { ...options, body})
    },
    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('PUT', url, {...options, body})
    },
    delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('DELETE', url, {...options, body})
    }
}