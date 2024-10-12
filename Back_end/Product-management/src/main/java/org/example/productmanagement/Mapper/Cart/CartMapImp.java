package org.example.productmanagement.Mapper.Cart;

import org.example.productmanagement.DTO.Cart.CartFrontDTO;
import org.example.productmanagement.DTO.Cart.CartReponseDTO;
import org.example.productmanagement.Entites.Cart;
import org.example.productmanagement.Entites.Product;
import org.example.productmanagement.Entites.Product_qte;
import org.example.productmanagement.Repository.ProductRepository;
import org.example.productmanagement.Repository.Product_qteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class CartMapImp implements CartMapInter {

	@Autowired
	Product_qteRepository product_qteRepository;
	@Autowired
	ProductRepository productRepository;


	@Override
	public CartReponseDTO FromCart2Reponse(Cart cart) {
		CartReponseDTO cartReponseDTO = new CartReponseDTO();
		cartReponseDTO.setId(cart.getIdC());
		List<Product_qte> productQteList = new ArrayList<>();
		for (Long p : cart.getIdProductsqte()) {
			Product_qte productQte = product_qteRepository.findById(p).get();
			productQteList.add(productQte);
		}
		cartReponseDTO.setProductQteList(productQteList);
		cartReponseDTO.setAmont(cart.getAmont());
		return cartReponseDTO;
	}

	@Override
	public CartFrontDTO FromCart2Front(Cart cart) {
		CartFrontDTO cartFrontDTO = new CartFrontDTO();
		cartFrontDTO.setId(cart.getIdC());
		List<Product_qte> productQteList = new ArrayList<>();
		for (Long p : cart.getIdProductsqte()) {
			Product_qte productQte = product_qteRepository.findById(p).get();
			productQte.setProduct(productRepository.findById(productQte.getIdproduct()).get());
			productQteList.add(productQte);
		}
		cartFrontDTO.setProductQteList(productQteList);
		cartFrontDTO.setAmont(cart.getAmont());
		return cartFrontDTO;
	}
}
