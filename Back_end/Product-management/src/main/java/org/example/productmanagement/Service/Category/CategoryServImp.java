package org.example.productmanagement.Service.Category;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.transaction.Transactional;
import org.example.productmanagement.DTO.Category.CategoryReponseDTO;
import org.example.productmanagement.DTO.Category.CategoryRequistDTO;
import org.example.productmanagement.Entites.Category;
import org.example.productmanagement.Mapper.Category.CategoryMapInter;
import org.example.productmanagement.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
@Transactional
public class CategoryServImp implements CategoryServInter {

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	CategoryMapInter categoryMapInter;


	private final Cloudinary cloudinary;

	public CategoryServImp(@Value("${cloudinary.cloud-name}") String cloudName,
						   @Value("${cloudinary.api-key}") String apiKey,
						   @Value("${cloudinary.api-secret}") String apiSecret) {
		cloudinary = new Cloudinary(ObjectUtils.asMap(
				"cloud_name", cloudName,
				"api_key", apiKey,
				"api_secret", apiSecret));
	}

	public Map deleteImage(String publicId) throws IOException {
		return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
	}
	public Map uploadImage(MultipartFile file) throws IOException {
		// Upload the file to Cloudinary
		Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
		return uploadResult;
	}


	@Override
	public void ADD(CategoryRequistDTO categoryRequistDTO) {
		categoryRepository.save(categoryMapInter.FromRequist2Category(categoryRequistDTO));
	}

	@Override
	public CategoryReponseDTO Getone(Long id) {
		return categoryMapInter.FromCategorye2Reponse(categoryRepository.findById(id).get());
	}

	@Override
	public List<CategoryReponseDTO> Getall() {
		List<Category> categoryList = categoryRepository.findAll();
		List<CategoryReponseDTO> categoryReponseDTOList = new ArrayList<>();
		for (Category category : categoryList) {
			categoryReponseDTOList.add(categoryMapInter.FromCategorye2Reponse(category));
		}
		return categoryReponseDTOList;
	}

	@Override
	public void update(CategoryRequistDTO categoryRequistDTO, Long id) {
		String imageUrl ;
		String publicId ;
		Category category = categoryRepository.findById(id).get();
		if (categoryRequistDTO.getName() != null) {
			category.setName(categoryRequistDTO.getName());
		}
		if (categoryRequistDTO.getPub() != null){
			category.setPub(categoryRequistDTO.getPub());
		}
		if (categoryRequistDTO.getImage() != null){
			try {
				deleteImage(category.getImageKey());
				Map uploadResult = uploadImage(categoryRequistDTO.getImage());
				imageUrl = (String) uploadResult.get("url");
				publicId = (String) uploadResult.get("public_id");
				category.setImage(imageUrl);
				category.setImageKey(publicId);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		categoryRepository.save(category);
	}

	@Override
	public void delete(Long id) {
		Category category = categoryRepository.findById(id).get();
		try {
			deleteImage(category.getImageKey());
			categoryRepository.deleteById(id);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}
}
