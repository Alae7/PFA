package org.example.productmanagement.Mapper.Category;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.example.productmanagement.DTO.Category.CategoryReponseDTO;
import org.example.productmanagement.DTO.Category.CategoryRequistDTO;
import org.example.productmanagement.Entites.Category;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;


@Component
public class CategoryMapImp implements CategoryMapInter {

	private final Cloudinary cloudinary;

	public CategoryMapImp(@Value("${cloudinary.cloud-name}") String cloudName,
						  @Value("${cloudinary.api-key}") String apiKey,
						  @Value("${cloudinary.api-secret}") String apiSecret) {
		cloudinary = new Cloudinary(ObjectUtils.asMap(
				"cloud_name", cloudName,
				"api_key", apiKey,
				"api_secret", apiSecret));
	}

	public Map uploadImage(MultipartFile file) throws IOException {
		// Upload the file to Cloudinary
		Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
		return uploadResult;
	}



	@Override
	public Category FromRequist2Category(CategoryRequistDTO categoryRequistDTO) {
		String imageUrl ;
		String publicId ;
		try {
			Map uploadResult = uploadImage(categoryRequistDTO.getImage());
			 imageUrl = (String) uploadResult.get("url");
			 publicId = (String) uploadResult.get("public_id");
			Category category = new Category();
			category.setName(categoryRequistDTO.getName());
			category.setPub(categoryRequistDTO.getPub());
			category.setImage(imageUrl);
			category.setImageKey(publicId);
			return category;
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public CategoryReponseDTO FromCategorye2Reponse(Category category) {
		CategoryReponseDTO categoryReponseDTO = new CategoryReponseDTO();
		categoryReponseDTO.setId(category.getId());
		categoryReponseDTO.setName(category.getName());
		categoryReponseDTO.setImage(category.getImage());
		categoryReponseDTO.setPub(category.getPub());
		return categoryReponseDTO;
	}
}
