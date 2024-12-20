export interface IUpdateUsername {
    username : string
  }

export interface ICreateCustomerAddress {
    userId : number
    address : string
    city : string
    state : string
    country : string
    postalCode : string
    phone : string
}

export interface IUpdateAddress {
  id : number
  address : string
  city : string
  state : string
  country : string
  postalCode : string
  phone : string
}

export interface ICustomerAddress {
  id : number
  address : string
  city : string
  state : string
  postalCode : string
  country : string
  phone : string
  isMain : boolean
  isDeleted: boolean
  userId : number
  longitude : number
  latitude : number
}

export interface IPrimaryAddress {
  userId: number
  addressId: number
}

export interface IUpdateMail {
  oldEmail : string
  newEmail : string
  token : string
}