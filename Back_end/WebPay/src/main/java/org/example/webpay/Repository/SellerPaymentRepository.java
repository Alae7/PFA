package org.example.webpay.Repository;

import org.example.webpay.Entities.SellerPayment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SellerPaymentRepository extends CrudRepository<SellerPayment, Integer> {
    List<SellerPayment> findBySellerId(Long sellerId);
}

