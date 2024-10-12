package org.example.productmanagement.Service.Cart;

import jakarta.transaction.Transactional;
import org.example.productmanagement.DTO.Cart.CartFrontDTO;
import org.example.productmanagement.DTO.Cart.CartReponseDTO;
import org.example.productmanagement.Entites.Cart;
import org.example.productmanagement.Entites.Product;
import org.example.productmanagement.Entites.Product_qte;
import org.example.productmanagement.Mapper.Cart.CartMapInter;
import org.example.productmanagement.Repository.CartRepository;
import org.example.productmanagement.Repository.ProductRepository;
import org.example.productmanagement.Repository.Product_qteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class CartServImp implements CartServInter {
	@Autowired
	CartRepository cartRepository;

	@Autowired
	ProductRepository productRepository;

	@Autowired
	CartMapInter cartMapInter;

	@Autowired
	Product_qteRepository pqtRepository;

	@Override
	public Long ADD() {
		Cart cart = new Cart();
		List<Long> ids = new ArrayList<>();
		Double amount = 00.00;
		cart.setAmont(amount);
		cart.setIdProductsqte(ids);
		cartRepository.save(cart);
		return cart.getIdC();
	}

	@Override
	public CartReponseDTO Getone(Long id) {
		return cartMapInter.FromCart2Reponse(cartRepository.findById(id).get());
	}

	@Override
	public CartFrontDTO GetoneCart(Long id) {
		return cartMapInter.FromCart2Front(cartRepository.findById(id).get());
	}

	@Override
	public List<CartReponseDTO> Getall() {
		List<Cart> cartList = cartRepository.findAll();
		List<CartReponseDTO> cartReponseDTOList = new ArrayList<>();
		for (Cart cart : cartList) {
			cartReponseDTOList.add(cartMapInter.FromCart2Reponse(cart));
		}
		return cartReponseDTOList;
	}

	@Override
	public void updateProductinCart(Long id,Product_qte product_qterequist) {
		Cart cart = cartRepository.findById(id).get();
		Product_qte product_qte1 = pqtRepository.findById(product_qterequist.getId()).get();
		Product product = productRepository.findById(product_qte1.getIdproduct()).get();
		if (product_qterequist.getQte() > product_qte1.getQte()) {
			int qte = product_qterequist.getQte() - product_qte1.getQte();
			cart.setAmont(cart.getAmont() + (product.getPrice()*qte));
			product.setStock(product.getStock() - qte);
			productRepository.save(product);
		}
		if (product_qterequist.getQte() < product_qte1.getQte()) {
			int qte = product_qte1.getQte() - product_qterequist.getQte();
			cart.setAmont(cart.getAmont() - (product.getPrice()*qte));
			product.setStock(product.getStock() + qte);
			productRepository.save(product);
		}
		product_qte1.setQte(product_qterequist.getQte());
		pqtRepository.save(product_qte1);
		cartRepository.save(cart);
	}

	@Override
	public void deleteProductformCart(Long id, Long idproductqte) {
		Cart cart = cartRepository.findById(id).get();
		Product_qte productQte = pqtRepository.findById(idproductqte).get();
		Product product = productRepository.findById(productQte.getIdproduct()).get();
		product.setStock(product.getStock() + productQte.getQte());
		productRepository.save(product);
		Double amount = product.getPrice()*productQte.getQte();
		cart.setAmont(cart.getAmont()-amount);
		List<Long> ids = new ArrayList<>();
		for (Long i : cart.getIdProductsqte()){
			if(i != idproductqte){
				ids.add(i);
			}
		}
		pqtRepository.deleteById(idproductqte);
		cart.setIdProductsqte(ids);
	}

	@Override
	public void addProductToCart(Long id, Product_qte productQte1) {
		Cart cart = cartRepository.findById(id).get();
		Product product = productRepository.findById(productQte1.getIdproduct()).get();
		Double amount = product.getPrice()*productQte1.getQte();
		amount = cart.getAmont()+amount;
		List<Long> ids = cart.getIdProductsqte();
		ids.add(productQte1.getId());
		cart.setIdProductsqte(ids);
		cart.setAmont(amount);
		cartRepository.save(cart);
	}


	@Override
	public void reset(Long id) {
		Cart cart =  cartRepository.findById(id).get();
		cart.setIdProductsqte(null);
		cart.setAmont(0.00);
		cartRepository.save(cart);
	}
}
