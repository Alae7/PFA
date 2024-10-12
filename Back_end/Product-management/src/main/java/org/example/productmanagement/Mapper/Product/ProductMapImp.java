package org.example.productmanagement.Mapper.Product;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.example.productmanagement.DTO.Product.ProductReponseDTO;
import org.example.productmanagement.DTO.Product.ProductRequistDTO;
import org.example.productmanagement.Entites.Product;
import org.example.productmanagement.Repository.CategoryRepository;
import org.example.productmanagement.Web.UserControllers.UserOpenFeginController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;


@Component
public class ProductMapImp implements ProductMapInter {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    UserOpenFeginController userOpenFeginController;

    private final Cloudinary cloudinary;

    public ProductMapImp(@Value("${cloudinary.cloud-name}") String cloudName,
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
    public Product FromRequist2Product(ProductRequistDTO productRequistDTO) {
        String imageUrl ;
        String publicId ;
        try {
            Map uploadResult = uploadImage(productRequistDTO.getImage());
            imageUrl = (String) uploadResult.get("url");
            publicId = (String) uploadResult.get("public_id");
            Product product = new Product();
            product.setIdcategory(productRequistDTO.getIdcategory());
            product.setIdseller(productRequistDTO.getIdseller());
            product.setName(productRequistDTO.getName());
            product.setPrice(productRequistDTO.getPrice());
            product.setStock(productRequistDTO.getStock());
            product.setDescription(productRequistDTO.getDescription());
            product.setDaTe_creation(productRequistDTO.getDaTe_creation());
            product.setImage(imageUrl);
            product.setImageKey(publicId);
            return product;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public ProductReponseDTO FromProduct2Reponse(Product product) {
        ProductReponseDTO productReponseDTO = new ProductReponseDTO();
        productReponseDTO.setIdcategory(product.getIdcategory());
        productReponseDTO.setIdseller(product.getIdseller());
        productReponseDTO.setIdProduct(product.getIdP());
        productReponseDTO.setName(product.getName());
        productReponseDTO.setDescription(product.getDescription());
        productReponseDTO.setDaTe_creation(product.getDaTe_creation());
        productReponseDTO.setPrice(product.getPrice());
        productReponseDTO.setStock(product.getStock());
        productReponseDTO.setImage(product.getImage());
        return productReponseDTO;
    }
}
