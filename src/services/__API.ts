import { AppConfig, storageKeys } from "@/helper/configs"
import * as storageService from "../helper/storage"
import {
  APIErrorResponse,
  APISuccessResponse as APIResponse,
} from "./types"

export default class __HttpClient {
  BASE_URL = AppConfig.API_BASE_URL || "http://localhost:3000"

  constructor() {}

  async get<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T | void>> {
    Object.assign(options, await this._getCommonOptions())
    options.method = "GET"
    options.next = { revalidate: 30 }

    return fetch(`${this.BASE_URL}${endpoint}`, options)
      .then(async (res: Response) => {
        const { ok, url } = res
        if (ok) return res.json()
        try {
          var _response: APIErrorResponse = JSON.parse(await res.text())
          throw { ..._response, endpoint }
        } catch (error) {
          throw error
        }
      })
      .then((data) => this._handleTokensInResponse(data))
      .catch((error: any) => this._handleHttpError(error))
  }

  async post<T = any>(
    endpoint: string,
    data: any = {},
    options: RequestInit = {}
  ): Promise<APIResponse<T | void>> {
    const commonOptions: RequestInit = await this._getCommonOptions()
    options = {
      ...commonOptions,
      ...options,
      headers: {
        ...commonOptions.headers,
        ...options.headers,
      },
      body: JSON.stringify(data),
      method: "POST",
    }

    return fetch(`${this.BASE_URL}${endpoint}`, options)
      .then(async (res: Response) => {
        const { ok, url } = res
        if (ok) return res.json()
        try {
          var _response: APIErrorResponse = JSON.parse(await res.text())
          throw { ..._response, endpoint }
        } catch (error) {
          throw error
        }
      })
      .then((data) => this._handleTokensInResponse(data))
      .catch((error: any) => this._handleHttpError(error))
  }

  async delete<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T | void>> {
    Object.assign(options, await this._getCommonOptions())
    options.method = "DELETE"
    return fetch(`${this.BASE_URL}${endpoint}`, options)
      .then(async (res: Response) => {
        const { ok, url } = res
        if (ok) return res.json()
        try {
          var _response: APIErrorResponse = JSON.parse(await res.text())
          throw { ..._response, endpoint }
        } catch (error) {
          throw error
        }
      })
      .then((data) => this._handleTokensInResponse(data))
      .catch((error: any) => this._handleHttpError(error))
  }

  async put<T = any>(
    endpoint: string,
    data: any = {},
    options: RequestInit = {}
  ): Promise<APIResponse<T | void>> {
    Object.assign(options, await this._getCommonOptions())
    options.method = "PUT"
    options.body = JSON.stringify(data)
    return fetch(`${this.BASE_URL}${endpoint}`, options)
      .then(async (res: Response) => {
        const { ok, url } = res
        if (ok) return res.json()
        try {
          var _response: APIErrorResponse = JSON.parse(await res.text())
          throw { ..._response, endpoint }
        } catch (error) {
          throw error
        }
      })
      .then((data) => this._handleTokensInResponse(data))
      .catch((error: any) => this._handleHttpError(error))
  }

  async patch<T = any>(
    endpoint: string,
    data: any = {},
    options: RequestInit = {}
  ): Promise<APIResponse<T | void>> {
    Object.assign(options, await this._getCommonOptions())
    options.method = "PATCH"
    options.body = data
    return fetch(`${this.BASE_URL}${endpoint}`, options)
      .then(async (res: Response) => {
        const { ok, url } = res
        if (ok) return res.json()
        try {
          var _response: APIErrorResponse = JSON.parse(await res.text())
          throw { ..._response, endpoint }
        } catch (error) {
          throw error
        }
      })
      .then((data) => this._handleTokensInResponse(data))
      .catch((error: any) => this._handleHttpError(error))
  }

  async _handleTokensInResponse(data: any) {
    const { data: all, ...rest } = data
    if (all) {
      const { token, refresh_token, session_id, user, ...content } = all
      if (token && refresh_token) {
        await storageService.saveString(storageKeys.ACCESS_TOKEN, token)
        await storageService.saveString(
          storageKeys.REFRESH_TOKEN,
          refresh_token
        )
      }
      if (session_id)
        await storageService.saveString(storageKeys.SESSION_ID, session_id)
      return { ...rest, data: { ...content, token, user } }
    }

    return data
  }

  async _handleHttpError(error: APIErrorResponse & { endpoint: string }) {
    // if (error?.response?.data) {
    const { statusCode, endpoint, message } = error

    if (
      statusCode !== 401 ||
      endpoint.endsWith("/auth/local") ||
      endpoint.endsWith("/auth/token")
    ) {
      throw error
    } else {
      return await this._handle401(error)
    }
    // } else {
    //   throw error
    // }
  }

  async _handle401(error: any) {
    const token = await storageService.loadString(storageKeys.ACCESS_TOKEN)
    const refreshToken = await storageService.loadString(
      storageKeys.REFRESH_TOKEN
    )

    return this.post("/auth/token", {
      token,
      refresh_token: refreshToken,
    }).catch(() => {
      storageService.clearAll()
      throw error
    })
  }

  async _getCommonOptions() {
    const options: { [x: string]: any } = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const token = await storageService.loadString(storageKeys.ACCESS_TOKEN)

    if (token) {
      options.headers = { ...options.headers, Authorization: `Bearer ${token}` }
    }

    return options
  }
}