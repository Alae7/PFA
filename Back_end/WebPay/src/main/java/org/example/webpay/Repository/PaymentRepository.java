package org.example.webpay.Repository;

import org.example.webpay.Entities.ClientPayment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PaymentRepository extends CrudRepository<ClientPayment, Integer> {
    List<ClientPayment> findByIdUser(Long idUser);
}
