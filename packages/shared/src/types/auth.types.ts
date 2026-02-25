/** 登录请求 */
export interface ILoginRequest {
  email: string
  password: string
}

/** 注册请求 */
export interface IRegisterRequest {
  email: string
  password: string
  username: string
  nickname?: string
}

/** Token 对 */
export interface ITokenPair {
  accessToken: string
  refreshToken: string
}

/** 登录响应 */
export interface ILoginResponse extends ITokenPair {
  user: {
    id: string
    email: string
    username: string
    nickname?: string
    avatar?: string
    role: string
  }
}

/** 刷新 Token 请求 */
export interface IRefreshTokenRequest {
  refreshToken: string
}
