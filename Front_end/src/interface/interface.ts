export interface User {
  id?: string;
  idCart?: number;
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;
  address?: string;
  role?: string;
  password?: string;
  confirmation?: string;
}

export interface Seller {
  id?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;
  address?: string;
  role?: string;
  password?: string;
  businessName?: string;
  businessEmail?: string;
  businessAddress?: string;
  paypalEmail?: string;
  sold?: string;
}

export interface Product {
  idProduct?: number;
  idcategory?: number;
  idseller?: number;
  sellerName?: string
  name?: string;
  stock?: number;
  description?: string;
  price?: number;
  daTe_creation?: string;
  image?: string;
}

export interface OrdreforPayment {
  idOrdre?: number;
  idUser?: number;
  amount?: number;
  productqtes?: Productqte[];
}

export interface Ordre {
  idOrdre?: number;
  user?: User;
  date?: string;
  amount?: number;
  status?: Status;
  productqtes?: Productqte[];
}

export interface Cart {
  id?: number;
  productQteList?: Productqte[];
  amont?: number;
}

export interface Category {
  id?: number;
  name?: string;
  image?: string;
  pub?: string;
}

export interface Categorydata {
  name?: string;
  pub?: string;
}

export interface Review {
  id?: number;
  user?: User;
  product?: Product;
  date?: string;
  rating?: number;
  comment?: string;
}

export interface ReviewRequist {
  iduser?: number;
  idproduct?: number;
  date?: string;
  rating?: number;
  comment?: string;
}

export interface Rate {
  rating?: number;
  nbReview?: number;
}

export enum Status {
  LISTEN = "LISTEN",
  COMPLETE = "COMPLETE",
  PENDING = "PENDING",
}

export interface Productqte {
  id?: number;
  product?: Product;
  qte?: number;
}
export interface ProductqteRequist {
  idproduct?: number;
  qte?: number;
}
export enum StatusVente {
  pending = "Pending",
  delivred= "delivred",
}

export interface Vente {
  id: number;
  idSeller: number;
  idOrder: number;
  nom_user: string;
  phone_user: string;
  adresse_user: string;
  country_user: string;
  product_name: string;
  price: number;
  quantity: number;
  status: StatusVente;
}

export interface SellerTransaction {
  paymentDate: string;
  amount: string;
  paymentStatus: string;
}

export interface ClientPayment {
  idPayment : number;
  idUser : number;
  idOrder : number;
  date_Payment: string;
  amount_Payment : number;
  payment_methode : string ;
  status : string;
}