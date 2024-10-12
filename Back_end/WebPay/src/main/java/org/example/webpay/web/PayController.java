package org.example.webpay.web;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.example.webpay.Entities.ClientPayment;
import org.example.webpay.Entities.SellerPayment;
import org.example.webpay.Model.*;
import org.example.webpay.Repository.PaymentRepository;
import org.example.webpay.Repository.SellerPaymentRepository;
import org.example.webpay.service.PaypalServiceClient;
import org.example.webpay.service.PaypalServiceClientInter;
import org.example.webpay.service.PaypalServiceSeller;
import org.example.webpay.service.PaypalServiceSellerInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.util.*;

import org.example.webpay.Model.Status;

import static org.example.webpay.Model.Status.FAILED;
import static org.example.webpay.Model.Status.SUCCESS;


@RestController
@RequestMapping("/api")
public class PayController {


    @Autowired
    private PaypalServiceClientInter paypalServiceClientInter;

    private org.example.webpay.Entities.ClientPayment obj;
    @Autowired
    PaymentRepository paymentClientRepository;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private PaypalServiceClient paypalServiceClient;


    // update order ----------------------------------------------

    private void updateOrder(Long id, Status status) {
        String url = "http://localhost:8888/ORDRE-SERVICE/api/ordres/" + id;
        HttpEntity<Status> request = new HttpEntity<>(status);
        restTemplate.exchange(url, HttpMethod.PUT, request, Void.class);
    }
    //--------------------------------------------------------------------

    //update solde ---------------------------------------------------
    List<Productqte> productqtes;




    public void addSold(Double totalPrice, Long sellerId) {
        // Vous pouvez ajouter ici la logique pour mettre à jour le montant vendu par le vendeur
        System.out.println("Ventes mises à jour pour le vendeur avec ID " + sellerId + ": " + totalPrice);

        String url = "http://localhost:8888/USER-SERVICE/api/v1/seller/" + sellerId + "/increaseSold";
        // Construire la requête HTTP
        HttpEntity<Double> request = new HttpEntity<>(totalPrice);

        // Envoyer la requête PUT
        ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.PUT, request, Void.class);
        System.out.println("update avec sucees");

    }


    private void updateSellerSoldeAdd(List<Productqte> productqtes) {
        System.out.println("----------------------------------------------------------------------------------");

        System.out.println(productqtes);
        // Map pour garder trace du montant total pour chaque vendeur
        Map<Long, Double> sellerSales = new HashMap<>();


        // Parcourir la liste des produits
        for (Productqte productqte : productqtes) {
            Product product = productqte.getProduct();

            // Assurer que le vendeur et le prix ne sont pas null avant de procéder
            if (product.getIdseller() != null && product.getPrice() != null) {
                Long sellerId = product.getIdseller();
                Double productPrice = product.getPrice();
                int quantity = productqte.getQte();

                // Calculer le montant total pour ce produit
                Double totalProductPrice = productPrice * quantity;



                // Ajouter le montant au vendeur correspondant
                sellerSales.put(sellerId, sellerSales.getOrDefault(sellerId, 0.0) + totalProductPrice);
            } else {
                System.out.println("Produit ou vendeur invalide, impossible de calculer la vente pour : " + product);
            }
        }

        // Appeler addSold pour chaque vendeur
        for (Map.Entry<Long, Double> entry : sellerSales.entrySet()) {
            Long sellerId = entry.getKey();
            Double totalPrice = entry.getValue();

            // Ajouter le montant vendu au solde du vendeur
            addSold(totalPrice, sellerId);
        }


    }


    //Ajouter vente  -------------------------------



    List<Vente> l;
    private  User getUser(Vente v){

        String url = "http://localhost:8888/ORDRE-SERVICE/api/user/" + v.getIdOrder() ;

        ResponseEntity<User> response = restTemplate.getForEntity(url, User.class);
        return response.getStatusCode().is2xxSuccessful() ? response.getBody() : null;


    }

    private void addvente (List<Vente> l){

        for (Vente v : l) {
            User user = new User();
            user = getUser(v);
            v.setNom_user(user.getFullName());
            v.setPhone_user(user.getPhone());
            v.setCountry_user(user.getCountry());
            v.setAdresse_user(user.getAddress());


        }


// Afficher les ventes créées pour vérification
        for (Vente v : l) {
            System.out.println("Détails de la vente : " + v);
        }


        String url = "http://localhost:8888/VENTE/api/vente";

        for (Vente v : l) {
            ResponseEntity<Vente> response = restTemplate.postForEntity(url, v, Vente.class);

        }


    }



















    @PostMapping("/pay/create")
    public Map<String, Object> createPayment(@RequestBody Map<String, Object> request) {
        try {
            System.out.println("Requête reçue : " + request);

            // Initialisation de l'objet ClientPayment
            obj = new org.example.webpay.Entities.ClientPayment();


            // Récupérer la liste des produits
            List<Map<String, Object>> productqteList = (List<Map<String, Object>>) request.get("productqtes");
            productqtes = new ArrayList<>();

            // Parcourir chaque élément de la liste et le convertir en objet Productqte
            for (Map<String, Object> productqteMap : productqteList) {
                Productqte productqte = new Productqte();
                productqte.setId(((Number) productqteMap.get("id")).longValue());
                productqte.setQte((Integer) productqteMap.get("qte"));





                // Récupérer la Map "product"
                Map<String, Object> productMap = (Map<String, Object>) productqteMap.get("product");
                Product product = new Product();

                // Extraire les valeurs de la Map "product" et remplacer par null si elles ne sont pas présentes
                product.setIdProduct(productMap.get("id") != null ? ((Number) productMap.get("id")).longValue() : null);
                product.setName(productMap.get("name") != null ? (String) productMap.get("name") : null);
                product.setPrice(productMap.get("price") != null ? ((Number) productMap.get("price")).doubleValue() : null);
                product.setStock(productMap.get("stock") != null ? (Integer) productMap.get("stock") : null);
                product.setCategory(productMap.get("category") != null ? ((Number) productMap.get("category")).longValue() : null);
                product.setIdseller(productMap.get("idseller") != null ? ((Number) productMap.get("idseller")).longValue() : null);
                product.setDescription(productMap.get("description") != null ? (String) productMap.get("description") : null);
                product.setDaTe_creation(productMap.get("daTe_creation") != null ? (String) productMap.get("daTe_creation") : null);
                product.setImage(productMap.get("image") != null ? (String) productMap.get("image") : null);

                // Assigner le produit à productqte
                productqte.setProduct(product);


                // Ajouter l'objet Productqte converti à la liste
                productqtes.add(productqte);
            }


// Récupérer l'ID de la commande
            Object idOrderObj = request.get("idOrdre");
            if (idOrderObj == null) {
                throw new IllegalArgumentException("idOrdre is required and cannot be null");
            }

            Long idOrder;
            if (idOrderObj instanceof Integer) {
                idOrder = ((Integer) idOrderObj).longValue();
            } else if (idOrderObj instanceof Long) {
                idOrder = (Long) idOrderObj;
            } else {
                throw new IllegalArgumentException("Invalid idOrdre type");
            }


            //  userid
            Object idUserObj = request.get("idUser");
            Long idUser;
            if (idUserObj instanceof Integer) {
                idUser = ((Integer) idUserObj).longValue();
            } else if (idUserObj instanceof Long) {
                idUser = (Long) idUserObj;
            } else {
                throw new IllegalArgumentException("Invalid idUser type");
            }



            // Récupérer le montant
            Object amountObj = request.get("amount");
            if (amountObj == null) {
                throw new IllegalArgumentException("amount is required and cannot be null");
            }

            Double amount;
            if (amountObj instanceof Integer) {
                amount = ((Integer) amountObj).doubleValue();
            } else if (amountObj instanceof Double) {
                amount = (Double) amountObj;
            } else {
                throw new IllegalArgumentException("Invalid amount type");
            }


            String currency = "USD";
            String description = "je veut a cheter ";


            l = new ArrayList<>(); // Liste pour stocker les ventes

            for (Productqte productqte : productqtes) {
                // Créer une nouvelle vente pour chaque produit
                Vente vente = new Vente();

                // Assigner les détails du produit à la vente
                vente.setIdOrder(idOrder); // L'ID de la commande
                vente.setProduct_name(productqte.getProduct().getName()); // Nom du produit
                vente.setIdSeller(productqte.getProduct().getIdseller()); // ID du vendeur

                // Calculer le prix total pour ce produit (prix * quantité)
                Double prix = productqte.getProduct().getPrice();
                int quantity = productqte.getQte();
                Double totalPrix = prix * quantity;
                vente.setPrice(totalPrix); // Assigner le prix total

                vente.setQuantity(quantity); // Assigner la quantité
                vente.setStatus(StatusV.Pending); // Statut de la vente

                // Ajouter la vente à la liste
                l.add(vente);
            }





            // Création du paiement PayPal
            Payment payment = paypalServiceClient.createPayment(
                    amount,
                    currency,
                    "paypal",
                    "sale",
                    description,
                    "http://localhost:8081/api/pay/cancel",  // Ajouter idOrder à l'URL d'annulation
                    "http://localhost:8081/api/pay/success?idOrder=" + idOrder    // Ajouter idOrder à l'URL de succès
            );

            String redirectUrl = payment.getLinks().stream()
                    .filter(link -> "approval_url".equals(link.getRel()))
                    .findFirst()
                    .map(link -> link.getHref())
                    .orElse("");

            // Pour la base de données (optionnel)
            obj.setDate();
            obj.setAmount_Payment(amount);
            obj.setPayment_methode("paypal");
            obj.setIdUser(idUser);
            obj.setIdOrder(Long.valueOf(idOrder));// Conversion en entier si idOrder est valide

            return Map.of("success", true, "redirectUrl", redirectUrl);

        } catch (NumberFormatException e) {
            e.printStackTrace();
            return Map.of("success", false, "message", "Invalid idOrder format");
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            return Map.of("success", false, "message", e.getMessage());
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return Map.of("success", false, "message", e.getMessage());
        }
    }


    @GetMapping("/pay/success")
    public RedirectView successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, @RequestParam("idOrder") String idOrder) {
        try {
            Payment payment = paypalServiceClientInter.executePayment(paymentId, payerId);
            if ("approved".equals(payment.getState())) {
                // Redirige vers l'URL de succès avec l'idOrder
                obj.setStatus("successful");
                paymentClientRepository.save(obj);
                updateSellerSoldeAdd(productqtes);
                addvente(l);
                updateOrder((long) obj.getIdOrder(),SUCCESS); // upadate order


                return new RedirectView("http://localhost:5173/success");
            }
        } catch (PayPalRESTException e) {
            e.printStackTrace();
        }
        // En cas d'échec, redirige vers l'URL d'annulation avec l'idOrder
        obj.setStatus("failed");
        paymentClientRepository.save(obj);
        updateOrder((long) obj.getIdOrder(),FAILED); // upadate order

        return new RedirectView("http://localhost:5173/failed");

    }

    @GetMapping("/pay/cancel")
    public RedirectView cancelPay() {
        obj.setStatus("failed");
        paymentClientRepository.save(obj);
        updateOrder((long) obj.getIdOrder(), FAILED); // upadate order

        return new RedirectView("http://localhost:5173/failed");
    }

    // c est la partie de PaypalServiceSeller --------------------------------------------------------------

    @Autowired
    private PaypalServiceSellerInter paypalServiceSellerInter;

    private void decreaseSold(Long id,Double amount){

        String url = "http://localhost:8888/USER-SERVICE/api/v1/seller/" + id + "/decreaseSold";
        // Construire la requête HTTP
        HttpEntity<Double> request = new HttpEntity<>(amount);

        // Envoyer la requête PUT
        ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.PUT, request, Void.class);
        System.out.println("update avec sucees");
    }

    private Double getSold(Long id) {
        String url = "http://localhost:8888/USER-SERVICE/api/v1/seller/" + id + "/sold";

        // Send GET request and retrieve the response as a Map
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<Map<String, Object>>() {});

        // Extract the amount field and convert it to Double
        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null && responseBody.containsKey("amount")) {
            return Double.valueOf(responseBody.get("amount").toString());
        }
        return null; // or throw an exception if needed
    }



    @Autowired
    SellerPaymentRepository sellerPaymentRepository;

    SellerPayment seller;


    @PostMapping("/payout/send")
    public ResponseEntity<Map<String, String>> sendPayout(@RequestBody Map<String, String> request) {
        String recipientEmail = request.get("recipientEmail");
        String amount = request.get("amount");
        String currency = "USD"; // Ou tout autre devise souhaitée
        String note = "Payout";
        String email = request.get("email");
        Integer sellerId = Integer.parseInt(request.get("sellerId"));

        seller = new SellerPayment();
        seller.setAmount(Double.parseDouble(amount));
        seller.setSellerId((long)sellerId);
        seller.setDate();
        seller.setEmail(email);
        Map<String, String> response = new HashMap<>();

        Double a=getSold((long)sellerId);

        System.out.println("Solde est : "+a);
        if(Double.parseDouble(amount)>a){
            System.out.println("vous aves pas solde suffisent");
            seller.setPaymentStatus("Cancelled");
            sellerPaymentRepository.save(seller);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);


        } else {

            try {
                paypalServiceSellerInter.sendPayout(recipientEmail, amount, currency, note);
                // Si aucun exception n'est levée, on considère que le paiement a été envoyé avec succès
                response.put("status", "success");
                response.put("message", "Payout sent successfully.");
                seller.setPaymentStatus("Completed");

                sellerPaymentRepository.save(seller);
                decreaseSold((long) sellerId, Double.parseDouble(amount));
                return new ResponseEntity<>(response, HttpStatus.OK);
            } catch (Exception e) {
                // Si une exception est levée, on considère que le paiement a échoué
                response.put("status", "failure");
                response.put("message", "Payout failed.");
                seller.setPaymentStatus("Cancelled");
                sellerPaymentRepository.save(seller);


                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }

    }


    ///////////////////////////////////////////////////////////////////////////////////////

    @GetMapping("/clientPayment")

    public List<ClientPayment> getClientPayment() {
        Iterable<ClientPayment> iterable = paymentClientRepository.findAll();
        List<ClientPayment> list = new ArrayList<>();
        iterable.forEach(list::add);  // Conversion d'Iterable en List
        return list;
    }

    @GetMapping("/sellerpayment/{sellerId}")
    public List<SellerPayment> getSellerPaymentsBySellerId(@PathVariable Long sellerId) {
        List<SellerPayment> payments = sellerPaymentRepository.findBySellerId(sellerId);
        return Optional.ofNullable(payments)
                .filter(list -> !list.isEmpty()) // Check if the list is not empty
                .orElseThrow(() -> new RuntimeException("No payments found for sellerId: " + sellerId));
    }



    @GetMapping("/clientPayment/{id}")
    public List<ClientPayment> getClientPaymentById(@PathVariable Long id) {
        return paymentClientRepository.findByIdUser(id);
    }



    @PutMapping("/clientPayment/fixidUser/{idUser}/{newIduser}")
    public void fixidUser(@PathVariable("idUser") Long idUser, @PathVariable("newIduser") Long newIduser){
        List<ClientPayment> payments = paymentClientRepository.findByIdUser(idUser);
        for (ClientPayment payment : payments) {
            payment.setIdUser(newIduser);
            paymentClientRepository.save(payment);
        }
        System.out.println("idUser = "+idUser+" newId user = " + newIduser);
    }

}