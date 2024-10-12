package org.example.productmanagement.Mapper.Cart;



import org.example.productmanagement.DTO.Cart.CartFrontDTO;
import org.example.productmanagement.DTO.Cart.CartReponseDTO;
import org.example.productmanagement.Entites.Cart;

public interface CartMapInter {
	public CartReponseDTO FromCart2Reponse(Cart cart);
	public CartFrontDTO FromCart2Front(Cart cart);
}
