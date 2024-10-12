package org.example.productmanagement.Web;



import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.productmanagement.DTO.Cart.CartFrontDTO;
import org.example.productmanagement.DTO.Cart.CartReponseDTO;
import org.example.productmanagement.DTO.Category.CategoryReponseDTO;
import org.example.productmanagement.DTO.Category.CategoryRequistDTO;
import org.example.productmanagement.DTO.Product.ProductReponseDTO;
import org.example.productmanagement.DTO.Product.ProductRequistDTO;
import org.example.productmanagement.DTO.Productqte.ProductqteReponsDTO;
import org.example.productmanagement.DTO.Productqte.ProductqteRequistDTO;
import org.example.productmanagement.DTO.Review.ReviewReponseDTO;
import org.example.productmanagement.DTO.Review.ReviewRequistDTO;
import org.example.productmanagement.Entites.Cart;
import org.example.productmanagement.Entites.Product;
import org.example.productmanagement.Entites.Product_qte;
import org.example.productmanagement.Entites.Review;
import org.example.productmanagement.InsufficientStockException;
import org.example.productmanagement.Mapper.Productqte.ProductqteMapInter;
import org.example.productmanagement.Model.CategoryData;
import org.example.productmanagement.Model.ProductData;
import org.example.productmanagement.Model.Rate;
import org.example.productmanagement.Repository.CartRepository;
import org.example.productmanagement.Repository.ProductRepository;
import org.example.productmanagement.Repository.Product_qteRepository;
import org.example.productmanagement.Repository.ReviewRepository;
import org.example.productmanagement.Service.Cart.CartServInter;
import org.example.productmanagement.Service.Category.CategoryServInter;
import org.example.productmanagement.Service.Product.ProductServInter;
import org.example.productmanagement.Service.Review.ReviewServInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@org.springframework.web.bind.annotation.RestController

@RequestMapping("/api")
public class RestController {

    @Autowired
    CartServInter cartServInter;
    @Autowired
    CategoryServInter categoryServInter;
    @Autowired
    ProductServInter productServInter;
    @Autowired
    ReviewServInter reviewServInter;
    @Autowired
    ProductqteMapInter productqteMapInter;


    @Autowired
    ProductRepository pRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    Product_qteRepository product_qteRepository;
    @Autowired
    private CartRepository cartRepository;


    //                                   ###     Cart Controller    ###


    @GetMapping("/carts")
    public List<CartReponseDTO> getCarts() {
       return cartServInter.Getall();
    }

    @GetMapping("/cartsV0/{id}")
    public CartReponseDTO getCartV0(@PathVariable Long id) {
        return cartServInter.Getone(id);
    }

    @PostMapping("/carts")
    public Long addCart() {
         return cartServInter.ADD();
    }

    @PutMapping("/cartsreset/{id}")
    public ResponseEntity<Void> resetCart(@PathVariable Long id) {
        try {
            cartServInter.reset(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


//                                   ###     Review Controller    ###

    @GetMapping("/reviews/{id}")
    public ReviewReponseDTO getReview(@PathVariable Long id) {
            return reviewServInter.Getone(id);
    }



    //                                   ###    Product_qte Controller    ###
    @GetMapping("/productsqteq/{id}")
    public ProductqteReponsDTO getProductsqteq(@PathVariable Long id) {
        return productqteMapInter.FromProduct2Reponse(id);

    }



    //    ######################################     FrontEnd    ##############################################


    //                                   ###     Cart Controller    ###


    @PutMapping("/cartsupdateqte/{id}")
    public void updateProductqteofCart(@PathVariable Long id, @RequestBody Product_qte productQte) {
    cartServInter.updateProductinCart(id, productQte);
    }

    @PutMapping("/cartsaddproduct/{id}")
    public ResponseEntity<Void> addProductToCart(@PathVariable Long id, @RequestBody ProductqteRequistDTO productQte) {
        try {
            // Initialisation de la quantité du produit à ajouter
            Product_qte productQte1 = new Product_qte();
            productQte1.setIdproduct(productQte.getIdproduct());
            productQte1.setQte(productQte.getQte());

            // Vérification de l'existence du produit et de la quantité en stock
            Product product = pRepository.findById(productQte1.getIdproduct())
                    .orElseThrow(() -> new InsufficientStockException("Product not found"));
            if (product.getStock() < productQte1.getQte()) {
                throw new InsufficientStockException("Insufficient stock for product ID: " + productQte1.getIdproduct());
            }

            // Mise à jour du stock du produit
            product.setStock(product.getStock() - productQte1.getQte());

            // Récupération du panier
            Cart cart = cartRepository.findById(id).orElseThrow(() -> new Exception("Cart not found"));
            boolean productExistsInCart = false;

            // Parcourir les produits du panier pour voir si le produit est déjà présent
            for (long i : cart.getIdProductsqte()) {
                Product_qte productQteInCart = product_qteRepository.findById(i).orElseThrow(() -> new Exception("Product_qte not found"));
                if (productQteInCart.getIdproduct() == productQte1.getIdproduct()) {
                    // Mise à jour de la quantité du produit dans le panier
                    productQteInCart.setQte(productQteInCart.getQte() + productQte1.getQte());
                    productQte1 = productQteInCart;
                    productExistsInCart = true;
                    break;
                }
            }

            // Sauvegarde du produit avec la nouvelle quantité
            pRepository.save(product);
            product_qteRepository.save(productQte1);

            // Ajout du produit dans le panier si ce n'est pas déjà le cas
            if (!productExistsInCart) {
                cartServInter.addProductToCart(id, productQte1);
            }else{
            // Mise à jour du montant du panier
            cart.setAmont(cart.getAmont() + product.getPrice());
            cartRepository.save(cart);
}
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (InsufficientStockException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Stock insuffisant ou produit non trouvé
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Panier ou autre erreur non trouvée
        }
    }

    @PutMapping("/cartsdeleteproduct/{id}")
    public ResponseEntity<Void> deleteProductFromCart(@PathVariable Long id, @RequestBody Long idproduct) {
        try {
            cartServInter.deleteProductformCart(id, idproduct);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/carts/{id}")
    public CartFrontDTO getCart(@PathVariable("id") Long id) {
        return cartServInter.GetoneCart(id);
    }


    //                                   ###     Category Controller    ###


    @GetMapping("/categorys")
    public List<CategoryReponseDTO> getCategories() {
        return categoryServInter.Getall();
    }

    @GetMapping("/categorys/{id}")
    public CategoryReponseDTO getCategory(@PathVariable Long id) {
        return categoryServInter.Getone(id);
    }

    @PostMapping("/categorys")
    public ResponseEntity<Void> addCategory(
            @RequestPart("file") MultipartFile file,
            @RequestPart("categoryData") String categoryDataJson
    ) {
        // Convert the JSON string into a CategoryData object
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryData categoryData;

        try {
            categoryData = objectMapper.readValue(categoryDataJson, CategoryData.class);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Prepare the DTO
        CategoryRequistDTO categoryRequistDTO = new CategoryRequistDTO();
        categoryRequistDTO.setName(categoryData.getName());
        categoryRequistDTO.setPub(categoryData.getPub());
        categoryRequistDTO.setImage(file);

        try {
            categoryServInter.ADD(categoryRequistDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



    @PutMapping("/categorys/{id}")
    public ResponseEntity<Void> updateCategory(@PathVariable Long id,  @RequestPart(value = "file" , required = false) MultipartFile file,
                                               @RequestPart("categoryData") String categoryDataJson
    ) {
        // Convert the JSON string into a CategoryData object
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryData categoryData;

        try {
            categoryData = objectMapper.readValue(categoryDataJson, CategoryData.class);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Prepare the DTO
        CategoryRequistDTO categoryRequistDTO = new CategoryRequistDTO();
        categoryRequistDTO.setName(categoryData.getName());
        categoryRequistDTO.setPub(categoryData.getPub());
        categoryRequistDTO.setImage(file);
        try {
            categoryServInter.update(categoryRequistDTO, id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/categorys/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        try {
            categoryServInter.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    //                                   ###     Product Controller    ###


    @GetMapping("/products")
    public List<ProductReponseDTO> getProducts() {
        return productServInter.Getall();
    }

    @GetMapping("/productsByCategory/{idcategory}")
    public List<ProductReponseDTO> getProductsByCategory(@PathVariable("idcategory") Long idcategory) {
        return productServInter.GetProductByCategory(idcategory);
    }

    @GetMapping("/getProductsBySeller/{id}")
    public List<ProductReponseDTO> getProductsBySeller(@PathVariable("id") Long id) {
        return productServInter.GetProductForSeller(id);
    }

    @GetMapping("/products/{id}")
    public ProductReponseDTO getProduct(@PathVariable Long id) {
        return productServInter.Getone(id);

    }

    @PostMapping("/products")
    public ResponseEntity<Void> addProduct(
        @RequestPart("file") MultipartFile file,
        @RequestPart("productData") String productDataJson
    ) {
            // Convert the JSON string into a CategoryData object
            ObjectMapper objectMapper = new ObjectMapper();
            ProductData productData;

            try {
                productData = objectMapper.readValue(productDataJson, ProductData.class);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            // Prepare the DTO
            ProductRequistDTO productRequistDTO = new ProductRequistDTO();
            productRequistDTO.setName(productData.getName());
            productRequistDTO.setStock(productData.getStock());
            productRequistDTO.setDescription(productData.getDescription());
            productRequistDTO.setIdseller(productData.getIdseller());
            productRequistDTO.setIdcategory(productData.getIdcategory());
            productRequistDTO.setPrice(productData.getPrice());
            productRequistDTO.setDaTe_creation(productData.getDaTe_creation());
            productRequistDTO.setImage(file);

            try {
                productServInter.ADD(productRequistDTO);
                return new ResponseEntity<>(HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Void> updateProduct(@PathVariable Long id, @RequestPart(value = "file",required = false) MultipartFile file,
                                              @RequestPart("productData") String productDataJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        ProductData productData;
        try {
            productData = objectMapper.readValue(productDataJson, ProductData.class);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ProductRequistDTO productRequistDTO = new ProductRequistDTO();
        productRequistDTO.setName(productData.getName());
        productRequistDTO.setStock(productData.getStock());
        productRequistDTO.setDescription(productData.getDescription());
        productRequistDTO.setIdseller(productData.getIdseller());
        productRequistDTO.setIdcategory(productData.getIdcategory());
        productRequistDTO.setPrice(productData.getPrice());
        productRequistDTO.setDaTe_creation(productData.getDaTe_creation());
        productRequistDTO.setImage(file);
        try {
            productServInter.update(productRequistDTO, id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/productstock/{id}/{qte}")
    public void updatestockProduct(@PathVariable("id") Long id ,@PathVariable("qte") int qte){
        productServInter.updatestock(id, qte);
    }


    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productServInter.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    //                                   ###     Review Controller    ###


    @GetMapping("/reviewsforproduct/{idProduct}")
    public List<ReviewReponseDTO> getReviews(@PathVariable("idProduct") Long idProduct) {
        return reviewServInter.Getall(idProduct);
    }

   @GetMapping("/reviewsforUser/{product}/{userid}")
    public ReviewReponseDTO getReviewforUser(@PathVariable("product") Long product,@PathVariable("userid") Long userid) {
        return reviewServInter.Getforuser(product,userid);
    }

    @PostMapping("/reviews")
    public ResponseEntity<Void> addReview(@RequestBody ReviewRequistDTO reviewRequistDTO) {
        try {
            reviewServInter.ADD(reviewRequistDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        try {
            reviewServInter.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    //                                   ###     calcule rate    ###


    @GetMapping("/rating/{id}")
    public Rate getRating(@PathVariable("id") Long id) {
        List<Review> reviewList = reviewRepository.findByIdProducts(id);
        double rating = 0;
        for (Review review : reviewList) {
            rating += review.getRating();
        }
        if (!reviewList.isEmpty()) {
            rating = rating / reviewList.size();
        }

        // Format rating to 2 decimal places
        rating = Math.round(rating * 100.0) / 100.0;

        Rate rate = new Rate();
        rate.setRating(rating);
        rate.setNbReview(reviewList.size());
        return rate;
    }


}




