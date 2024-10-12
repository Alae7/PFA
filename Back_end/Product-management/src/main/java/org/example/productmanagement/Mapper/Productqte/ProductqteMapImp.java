package org.example.productmanagement.Mapper.Productqte;

import org.example.productmanagement.DTO.Productqte.ProductqteReponsDTO;
import org.example.productmanagement.Entites.Product;
import org.example.productmanagement.Entites.Product_qte;
import org.example.productmanagement.Mapper.Product.ProductMapInter;
import org.example.productmanagement.Repository.CategoryRepository;
import org.example.productmanagement.Repository.ProductRepository;
import org.example.productmanagement.Repository.Product_qteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;




@Component
public class ProductqteMapImp implements ProductqteMapInter {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    Product_qteRepository product_qteRepository;
    @Autowired
    ProductMapInter productMapInter;

    @Override
    public ProductqteReponsDTO FromProduct2Reponse(Long id) {
        Product_qte productQte = product_qteRepository.findById(id).get();
        ProductqteReponsDTO productqteReponsDTO = new ProductqteReponsDTO();
        productqteReponsDTO.setId(productQte.getIdproduct());
        Product product = productRepository.findById(productQte.getIdproduct()).get();
        productqteReponsDTO.setProduct(productMapInter.FromProduct2Reponse(product));
        productqteReponsDTO.setQte(productQte.getQte());
        System.out.println(productqteReponsDTO.getProduct());
        return productqteReponsDTO;
    }
}
