export interface ICity{
    code: number
    city: string
    country_code: string
    country: string
    region: string
    region_code: number
    postal_codes: string[]
    longitude: number
    latitude: number
    time_zone: string
    fias_id: string
}

export interface IRegion{
    country_code: string,
    country: string,
    region: string,
    region_code: number
}

export interface IParam{
    parameter_id: number
    title_parameter: string
    group: string
    values: string[]
  }
  
export interface IOrder {
  order_id?: number
  last_name:string
  first_name:string
  patronymic:string
  telephone:string
  country: string
  country_code: string
  region:string
  location:string
  delivery_point:string
  delivery_point_code:string
  feedback_URL: string
  date?: string
  confirmed?: boolean
  message?: string
  weight: number
  products: IProduct[]
  cost_of_products: number
  cost_of_delivery: number
  delivery: string
  sender_name: string
  sender_phone_number: string
  uuid?: string
}
  
  export  interface IProduct{
    product_id: number
    title_product: string
    price: number
    description?: string
    count: number
    title_type: string
    type_id: number
    title_category: string
    category_id: number
    parameters: IParam[]
    available?: boolean
  }
  
  export interface IBasket{
    products: IProduct[]
    total_amount: number
  }

export interface IDeliverypoint{
    code: string,
    name: string,
    address_comment: string,
    nearest_station: string,
    region_code: number
}

export interface IInformation{
  name: string
  location: string
  country: string
  country_code: string
  region: string
  tariff_code: string
  telephone: string
  delivery_point_sdek: string
  delivery_point_code_sdek: string
}