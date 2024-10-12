package org.example.productmanagement.Service.Product;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.transaction.Transactional;
import org.example.productmanagement.DTO.Product.ProductReponseDTO;
import org.example.productmanagement.DTO.Product.ProductRequistDTO;
import org.example.productmanagement.Entites.Product;
import org.example.productmanagement.Mapper.Product.ProductMapInter;
import org.example.productmanagement.Repository.ProductRepository;
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
public class ProductServImp implements ProductServInter {
	@Autowired
	ProductRepository productRepository;

	@Autowired
	ProductMapInter productMapInter;

	private final Cloudinary cloudinary;

	public ProductServImp(@Value("${cloudinary.cloud-name}") String cloudName,
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
	public void ADD(ProductRequistDTO productRequistDTO) {
		productRepository.save(productMapInter.FromRequist2Product(productRequistDTO));
	}

	@Override
	public ProductReponseDTO Getone(Long id) {
		return productMapInter.FromProduct2Reponse(productRepository.findById(id).get());
	}

	@Override
	public List<ProductReponseDTO> GetProductForSeller(Long idseller) {
		List<Product> productList = productRepository.findByIdseller(idseller);
		List<ProductReponseDTO> productReponseDTOList = new ArrayList<>();
		for (Product product : productList) {
			productReponseDTOList.add(productMapInter.FromProduct2Reponse(product));
		}
		return productReponseDTOList;
	}

	@Override
	public List<ProductReponseDTO> GetProductByCategory(Long idcategory) {
		List<Product> productList = productRepository.findByIdcategory(idcategory);
		List<ProductReponseDTO> productReponseDTOList = new ArrayList<>();
		for (Product product : productList) {
			productReponseDTOList.add(productMapInter.FromProduct2Reponse(product));
		}
		return productReponseDTOList;
	}

	@Override
	public List<ProductReponseDTO> Getall() {
		List<Product> products = productRepository.findAll();
		List<ProductReponseDTO> productReponseDTOs = new ArrayList<>();
		for (Product product : products) {
			productReponseDTOs.add(productMapInter.FromProduct2Reponse(product));
		}
		return productReponseDTOs;
	}

	@Override
	public void update(ProductRequistDTO productRequistDTO, Long id) {
		String imageUrl ;
		String publicId ;
		Product product = productRepository.findById(id).get();
		if(productRequistDTO.getPrice() != null){
			product.setPrice(productRequistDTO.getPrice());
		}
		if (productRequistDTO.getStock() != null){
			product.setStock(productRequistDTO.getStock());
		}
		if (productRequistDTO.getName() != null){
			product.setName(productRequistDTO.getName());
		}
		if (productRequistDTO.getIdcategory() != null){
			product.setIdcategory(productRequistDTO.getIdcategory());
		}
		if(productRequistDTO.getDescription() != null){
			product.setDescription(productRequistDTO.getDescription());
		}
		if (productRequistDTO.getDaTe_creation() != null){
			product.setDaTe_creation(productRequistDTO.getDaTe_creation());
		}
		if (productRequistDTO.getImage() != null){
			try {
				deleteImage(product.getImageKey());
				Map uploadResult = uploadImage(productRequistDTO.getImage());
				imageUrl = (String) uploadResult.get("url");
				publicId = (String) uploadResult.get("public_id");
				product.setImage(imageUrl);
				product.setImageKey(publicId);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		productRepository.save(product);
	}

	@Override
	public void updatestock(long id, int qte) {
		Product product = productRepository.findById(id).get();
		product.setStock(product.getStock() + qte);
		productRepository.save(product);
	}

	@Override
	public void delete(Long id) {
		Product product = productRepository.findById(id).get();
        try {
            deleteImage(product.getImageKey());
			productRepository.deleteById(id);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
	}
}
