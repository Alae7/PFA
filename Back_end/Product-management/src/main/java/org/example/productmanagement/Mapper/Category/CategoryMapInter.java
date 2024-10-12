package org.example.productmanagement.Mapper.Category;


import org.example.productmanagement.DTO.Category.CategoryReponseDTO;
import org.example.productmanagement.DTO.Category.CategoryRequistDTO;
import org.example.productmanagement.Entites.Category;

public interface CategoryMapInter {
	public Category FromRequist2Category(CategoryRequistDTO categoryRequistDTO);
	public CategoryReponseDTO FromCategorye2Reponse(Category category);
}
