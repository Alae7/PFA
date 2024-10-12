package com._3dsf.marketplace.users.clients;

import com._3dsf.marketplace.users.dto.CategoryDto;
import com._3dsf.marketplace.users.dto.ProductDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "Product-management")
public interface ProductClient {

    ////    Product-service


    @GetMapping("/api/getProductsBySeller/{id}")
    public List<ProductDto> getProductsBySeller(@PathVariable("id") Long id);

    @PostMapping("/api/products")
    public ResponseEntity<Void> addProduct(@RequestBody ProductDto productRequistDTO);

    @PutMapping("/api/products/{id}")
    public ResponseEntity<Void> updateProduct(@PathVariable Long id, @RequestBody ProductDto productRequistDTO);

    @DeleteMapping("api/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id);




    /////     Category-service


    @GetMapping("/api/categorys")
    public List<CategoryDto> getCategories();

    @GetMapping("/api/categorys/{id}")
    public CategoryDto getCategory(@PathVariable Long id);

    @PostMapping("/api/categorys")
    public ResponseEntity<Void> addCategory(@RequestBody CategoryDto categoryRequistDTO);

    @PutMapping("/api/categorys/{id}")
    public ResponseEntity<Void> updateCategory(@PathVariable Long id, @RequestBody CategoryDto categoryRequistDTO);

    @DeleteMapping("/api/categorys/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id);



    //////   Cart-service



    @PostMapping("/api/carts")
    public Long addCart();




}
