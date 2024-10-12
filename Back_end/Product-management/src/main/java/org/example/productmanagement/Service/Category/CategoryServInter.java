package org.example.productmanagement.Service.Category;


import org.example.productmanagement.DTO.Category.CategoryReponseDTO;
import org.example.productmanagement.DTO.Category.CategoryRequistDTO;

import java.util.List;

public interface CategoryServInter {
	
//	##########     POST    ##########
	
	public void ADD(CategoryRequistDTO categoryRequistDTO);
	
//	##########     GET    ##########
	
	public CategoryReponseDTO Getone(Long id);
	
//	##########     GET ALL    ##########
	
 	public List<CategoryReponseDTO> Getall();
	
// 	##########     PUT    ##########
 	
 	public void update(CategoryRequistDTO categoryRequistDTO,Long id);
 	
// 	##########     DELETE    ##########
 	public void delete(Long id);

}
