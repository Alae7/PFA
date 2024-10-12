package com._3dsf.marketplace.users.controllers;

import com._3dsf.marketplace.users.bo.Seller;
import com._3dsf.marketplace.users.bo.auth.RegisterSellerRequest;
import com._3dsf.marketplace.users.clients.OrdreClient;
import com._3dsf.marketplace.users.clients.ProductClient;
import com._3dsf.marketplace.users.clients.WebPayClient;
import com._3dsf.marketplace.users.dto.AmountDto;
import com._3dsf.marketplace.users.dto.SellerDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import com._3dsf.marketplace.users.dto.ProductDto;
import com._3dsf.marketplace.users.services.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/seller")
//@PreAuthorize("hasAuthority('SELLER')")
@RequiredArgsConstructor
@Tag(name = "Seller")
public class SellerController {

    private final SellerService sellerService;

    @Autowired
    private final OrdreClient ordreClient;

    @Autowired
    private final WebPayClient webPayClient;

    @GetMapping("/{idSeller}")
    public ResponseEntity<Seller> getSeller(@PathVariable("idSeller") Long idSeller) {
        return ResponseEntity.ok(sellerService.getSellerById(idSeller));
    }

    @PostMapping("/{idUser}")
    public ResponseEntity<?> addSeller(@PathVariable("idUser") Long idUser,
                                       @RequestBody SellerDto sellerDto)
    {
        Long idSeller = sellerService.addSeller(idUser, sellerDto);
        ordreClient.fixidUser(idUser, idSeller);
        webPayClient.fixidUser(idUser, idSeller);
        return ResponseEntity.ok("new seller added successfully with Id: " + idSeller);
    }

    @PutMapping("/{idSeller}")
    public ResponseEntity<?> updateSeller(@PathVariable("idSeller") Long idSeller,
                                          @RequestBody RegisterSellerRequest sellerDto) {
        sellerService.updateSeller(idSeller, sellerDto);
        return ResponseEntity.ok("Seller updated successfully");
    }

    @GetMapping("/{idSeller}/sold")
    public AmountDto getSold(@PathVariable("idSeller") Long idSeller) {
        return new AmountDto(sellerService.getSellerSold(idSeller));
    }

    @PutMapping("/{idSeller}/increaseSold")
    public void increaseSold(@PathVariable("idSeller") Long idSeller,
                             @RequestBody Double amountDto)
    {
        sellerService.increaseSellerSold(idSeller, amountDto);
    }

    @PutMapping("/{idSeller}/decreaseSold")
    public void decreaseSold(@PathVariable("idSeller") Long idSeller,
                             @RequestBody Double amountDto)
    {
        sellerService.decreaseSellerSold(idSeller, amountDto);
    }

    @GetMapping("/{idSeller}/products")
    public ResponseEntity<List<ProductDto>> listSellerProducts(@PathVariable("idSeller") Long idSeller) {
        return ResponseEntity.ok(sellerService.getProductsBySellerId(idSeller));
    }

    @PostMapping("/addProduct")
    public ResponseEntity<?> addProduct(@RequestBody ProductDto product) {
        sellerService.addProduct(product);
        return ResponseEntity.ok("Product added successfully");
    }

    @PutMapping("/updateProduct/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable("productId") Long productId, @RequestBody ProductDto product) {
        sellerService.updateProduct(productId, product);
        return ResponseEntity.ok("Product updated successfully");
    }

    @DeleteMapping("/removeProduct/{productId}")
    public ResponseEntity<?> removeProduct(@PathVariable("productId") Long productId) {
        sellerService.removeProduct(productId);
        return ResponseEntity.ok("Product removed successfully");
    }
}
