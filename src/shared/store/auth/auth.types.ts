export interface LoginResponse {
  token: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface GetCurrentUserResponse {
  id: number
  firstName: string
  lastName: string
}

export interface GetCurrentUserPayload {}
