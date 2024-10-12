package com.Marketplace.OrdreService.Web.productControllers;

import com.Marketplace.OrdreService.Model.Cart;
import com.Marketplace.OrdreService.Model.Product;
import com.Marketplace.OrdreService.Model.Productqte;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@FeignClient(name = "Product-management")

public interface ProductOpenFeignController {

    @GetMapping("/api/products")
    public List<Product> find_allProducts();

    @GetMapping("/api/products/{id}")
    Product findProductsByid(@PathVariable("id") Long id);

    @GetMapping("/api/productsqteq/{id}")
    public Productqte getProductsqteq(@PathVariable Long id);

    @PutMapping("/api/cartsreset/{id}")
    public void resetCart(@PathVariable Long id);

    @GetMapping("/api/cartsV0/{id}")
    public Cart getCartV0(@PathVariable Long id);

    @PutMapping("/api/productstock/{id}/{qte}")
    public void updatestockProduct(@PathVariable("id") Long id , @PathVariable("qte") int qte);
}
