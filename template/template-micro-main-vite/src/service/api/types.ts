import { ResType } from '@/service/http'

export interface ILoginParams {
  userName: string
  passWord: string | number
}
export interface ILoginApi {
  login: (params: ILoginParams) => Promise<ResType<ILoginRes>>
}
export interface ILoginRes {
  token: string
}
