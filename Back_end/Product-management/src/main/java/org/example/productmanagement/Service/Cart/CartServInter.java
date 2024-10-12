package org.example.productmanagement.Service.Cart;

import org.example.productmanagement.DTO.Cart.CartFrontDTO;
import org.example.productmanagement.DTO.Cart.CartReponseDTO;
import org.example.productmanagement.Entites.Product_qte;

import java.util.List;

public interface CartServInter {
	
//	##########     POST    ##########
	
	public Long ADD();
	
//	##########     GET    ##########
	
	public CartReponseDTO Getone(Long id);

	public CartFrontDTO GetoneCart(Long id);
	
//	##########     GET ALL    ##########
	
 	public List<CartReponseDTO> Getall();

	void updateProductinCart(Long idproduct, Product_qte productqterequist);
	
// 	##########     PUT    ##########
	void deleteProductformCart(Long id, Long idproduct);

	void addProductToCart(Long id, Product_qte productQte1);
 	
// 	##########     DELETE    ##########
 	public void reset(Long id);



}
