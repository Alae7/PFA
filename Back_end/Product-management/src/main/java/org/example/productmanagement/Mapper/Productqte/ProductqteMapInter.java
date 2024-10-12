package org.example.productmanagement.Mapper.Productqte;


import org.example.productmanagement.DTO.Product.ProductReponseDTO;
import org.example.productmanagement.DTO.Product.ProductRequistDTO;
import org.example.productmanagement.DTO.Productqte.ProductqteReponsDTO;
import org.example.productmanagement.Entites.Product;
import org.example.productmanagement.Entites.Product_qte;

public interface ProductqteMapInter {
	public ProductqteReponsDTO FromProduct2Reponse(Long id);
}
