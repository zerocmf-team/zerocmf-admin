import { request as umiRequest } from 'umi'
import type { RequestOptionsInit } from 'umi-request'

export const request = (url: string, options: RequestOptionsInit & { skipErrorHandler?: boolean | undefined }) => {
    return umiRequest(url, options)
}

export const authRequest = (url: string, options: RequestOptionsInit & { skipErrorHandler?: boolean | undefined } = {}) => {
    options.token = true
    return request(url, options)
} 