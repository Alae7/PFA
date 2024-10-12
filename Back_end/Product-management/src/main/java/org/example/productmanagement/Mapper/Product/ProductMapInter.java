package org.example.productmanagement.Mapper.Product;


import org.example.productmanagement.DTO.Product.ProductReponseDTO;
import org.example.productmanagement.DTO.Product.ProductRequistDTO;
import org.example.productmanagement.Entites.Product;

public interface ProductMapInter {
	public Product FromRequist2Product(ProductRequistDTO productRequistDTO);
	public ProductReponseDTO FromProduct2Reponse(Product product);
}
