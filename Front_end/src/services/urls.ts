import {
  Seller,
  Cart,
  Category,
  Ordre,
  Product,
  Productqte,
  ProductqteRequist,
  Rate,
  Review,
  ReviewRequist,
  User,
  OrdreforPayment,
  ClientPayment,
  Vente,
} from "../interface/interface";

import http from "./service";

class URLS {
  private urlsPay = "WEBPAY/api";
  private urlsUser = "USER-SERVICE/api/v1";
  private urlsProduct = "PRODUCT-MANAGEMENT/api";
  private urlsOrder = "ORDRE-SERVICE/api";
  private urlsVente = "VENTE/api";

  //authentication
  Register(user: User) {
    return http.post(`${this.urlsUser}/auth/register`, user);
  }

  login(user: User) {
    return http.post(`${this.urlsUser}/auth/authenticate`, user);
  }
  doLogout() {
    return http.post(`${this.urlsUser}/auth/logout`);
  }

  forgotPassword(email) {
    return http.post(`${this.urlsUser}/auth/forgot-password`, { email });
  }
  resetPassword(email, newPassword) {
    return http.post(`${this.urlsUser}/auth/reset-password`, {
      email,
      newPassword,
    });
  }
  verifyResetCode(email, code) {
    return http.post(`${this.urlsUser}/auth//verify-reset-code`, {
      email,
      code,
    });
  }

  //     ##########          Product   ###################

  addProduct(formData: FormData) {
    return http.post(`${this.urlsProduct}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important to handle multipart
      },
    });
  }

  getProducts() {
    return http.get<Product[]>(`${this.urlsProduct}/products`);
  }

  getProductsByCategory(idcategory: number) {
    return http.get<Product[]>(
      `${this.urlsProduct}/productsByCategory/${idcategory}`
    );
  }

  getOneProduct(productId: number) {
    return http.get<Product>(`${this.urlsProduct}/products/${productId}`);
  }

  getProductsBySeller(sellerid: number) {
    return http.get<Product[]>(
      `${this.urlsProduct}/getProductsBySeller/${sellerid}`
    );
  }

  updateProduct(productId: number, formData: FormData) {
    return http.put(`${this.urlsProduct}/products/${productId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

  deleteProduct(productid: number) {
    return http.delete(`${this.urlsProduct}/products/${productid}`);
  }

  //     ##########          Cart   ###################

  getCart(cartId: number | undefined) {
    return http.get<Cart>(`${this.urlsProduct}/carts/${cartId}`);
  }

  updateProductqteofCart(cartId: number | undefined, productqte: Productqte) {
    return http.put(`${this.urlsProduct}/cartsupdateqte/${cartId}`, productqte);
  }

  addProductToCart(id: number, productqte: ProductqteRequist) {
    return http.put(`${this.urlsProduct}/cartsaddproduct/${id}`, productqte);
  }

  deleteProductFromCart(
    cartId: number | undefined,
    idproductqte: number | undefined
  ) {
    return http.put(
      `${this.urlsProduct}/cartsdeleteproduct/${cartId}`,
      idproductqte
    );
  }

  //     ##########          Category   ###################

  getCategories() {
    return http.get<Category[]>(`${this.urlsProduct}/categorys`);
  }

  addCategory(formData: FormData) {
    return http.post(`${this.urlsProduct}/categorys`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important to handle multipart
      },
    });
  }

  updateCategory(categoryid: number, formData: FormData) {
    return http.put(`${this.urlsProduct}/categorys/${categoryid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important to handle multipart
      },
    });
  }

  deleteCategory(categoryid: number) {
    return http.delete(`${this.urlsProduct}/categorys/${categoryid}`);
  }

  //     ##########          Review   ###################

  getReviews(idProduct: number | undefined) {
    return http.get<Review[]>(
      `${this.urlsProduct}/reviewsforproduct/${idProduct}`
    );
  }

  getReviewforUser(product: number, userid: number) {
    return http.get<Review>(
      `${this.urlsProduct}/reviewsforUser/${product}/${userid}`
    );
  }

  addReview(reviewRequist: ReviewRequist) {
    return http.post(`${this.urlsProduct}/reviews`, reviewRequist);
  }

  deleteReview(reviewid: number) {
    return http.delete(`${this.urlsProduct}/reviews/${reviewid}`);
  }

  //     ##########          calcule rate    ###################

  getRating(id: number) {
    return http.get<Rate>(`${this.urlsProduct}/rating/${id}`);
  }

  //     ##########          ordre     ###################

  addOrdre(userid: number) {
    return http.post<number>(`${this.urlsOrder}/createOrdre/${userid}`);
  }

  getOrdreById(ordreid: number) {
    return http.get<Ordre>(`${this.urlsOrder}/oneordres/${ordreid}`);
  }

  getAllOrdres(ordreid: number) {
    return http.get<Ordre[]>(`${this.urlsOrder}/ordres/${ordreid}`);
  }
  getAllOrdresadmin() {
    return http.get<Ordre[]>(`${this.urlsOrder}/ordresadmin`);
  }

  //  #################################################"

  buyProduct(ordreforpayment: OrdreforPayment) {
    return http.post(`${this.urlsPay}/pay/create`, ordreforpayment);
  }

  getPayed(payload) {
    return http.post(`${this.urlsPay}/payout/send`, payload);
  }

  getUserCart(id: number | undefined) {
    return http.get<number>(`${this.urlsUser}/users/${id}/cart`);
  }

  //seller transaction
  getSellerTransaction(id: string | undefined) {
    return http.get(`${this.urlsPay}/sellerpayment/${id}`);
  }

  // purchase
  getpurshas(id : number) {
    return http.get<ClientPayment>(`${this.urlsPay}/clientPayment/${id}`);
  }

  //users
  getUsers() {
    return http.get(`${this.urlsUser}/admin/listUsers`);
  }
  getSellers() {
    return http.get(`${this.urlsUser}/admin/listSellers`);
  }
  getAdmins() {
    return http.get(`${this.urlsUser}/admin/listAdmins`);
  }

  getAdminsById(id) {
    return http.get(`${this.urlsUser}/admin/${id}`);
  }
  getSellerById(id) {
    return http.get(`${this.urlsUser}/seller/${id}`);
  }
  getUserById(id) {
    return http.get(`${this.urlsUser}/users/${id}`);
  }
  updateUsers(user: User) {
    return http.put(`${this.urlsUser}/admin/updateUser/${user.id}`, user);
  }
  updateUser(seller: Seller) {
    return http.put(`${this.urlsUser}/users/${seller.id}`, seller);
  }
  updateSellers(seller: Seller) {
    return http.put(`${this.urlsUser}/admin/updateSeller/${seller.id}`, seller);
  }
  updateSeller(seller: Seller) {
    return http.put(`${this.urlsUser}/seller/${seller.id}`, seller);
  }
  updateAdmins(user: User) {
    return http.put(`${this.urlsUser}/admin/${user.id}`, user);
  }

  deleteUsers(id: number) {
    return http.delete(`${this.urlsUser}/admin/removeUser/${id}`);
  }
  deleteSellers(id: number) {
    return http.delete(`${this.urlsUser}/admin/removeSeller/${id}`);
  }
  deleteAdmins(id: number) {
    return http.delete(`${this.urlsUser}/admin/removeAdmin/${id}`);
  }

  userToSeller(id: string | undefined, seller: Seller) {
    return http.post(`${this.urlsUser}/seller/${id}`, seller);
  }

  //Vente
  getVenteByIdSeller(id: string | undefined){
    return http.get(`${this.urlsVente}/vente/seller/${id}`);
  }
  productDelivred(vente: Vente) {
    return http.put(`${this.urlsVente}/vente/deliver/${vente.id}`, vente);
  }
  getVenteById(id) {
    return http.get(`${this.urlsUser}/vente/${id}`);
  }

}
export default new URLS();
