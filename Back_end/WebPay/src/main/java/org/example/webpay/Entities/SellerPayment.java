package org.example.webpay.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import java.text.SimpleDateFormat;
import java.util.Date;


@Entity
@Data
public class SellerPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPayment;
    private Long sellerId;
    private Double amount;
    private String paymentStatus;
    private String paymentDate;
    private  String email;


    public void setDate() {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        this.paymentDate = formatter.format(new Date());
    }

}
