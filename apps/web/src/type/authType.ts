export interface IRegisterUser {
  username : string
  email : string
}

export interface ISetPassUser{
  password : string
  verifyToken : string
}

export interface ILoginUser {
  email : string
  password : string
}

export interface IDecodedLoginToken {
  id: number
  username: string
  email: string
  role: string
}
