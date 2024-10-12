package org.example.productmanagement.Service.Product;


import org.example.productmanagement.DTO.Product.ProductReponseDTO;
import org.example.productmanagement.DTO.Product.ProductRequistDTO;

import java.util.List;

public interface ProductServInter {
	
//	##########     POST    ##########
	
	public void ADD(ProductRequistDTO productRequistDTO);
	
//	##########     GET    ##########
	
	public ProductReponseDTO Getone(Long id);

	//	##########     GET all product for specific seller    ##########

	public List<ProductReponseDTO> GetProductForSeller(Long idseller);
	public List<ProductReponseDTO> GetProductByCategory(Long idcategory);
	
//	##########     GET ALL    ##########
	
 	public List<ProductReponseDTO> Getall();
	
// 	##########     PUT    ##########
 	
 	public void update(ProductRequistDTO productRequistDTO,Long id);

	public void updatestock(long id, int qte);
 	
// 	##########     DELETE    ##########
 	public void delete(Long id);

}
