export interface APIErrorResponse {
    statusCode: number
    message: string
    error?: string
  }
  
  export interface APISuccessResponse<T> {
    data: T
    message: string
  }