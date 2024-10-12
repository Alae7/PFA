package org.example.webpay.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Entity
@Data
public class ClientPayment  {

  @Id  @GeneratedValue(strategy = GenerationType.IDENTITY)
private int idPayment;
  private Long idUser;
  private  Long idOrder;
  private String Date_Payment;
  private Double Amount_Payment;
  private  String Payment_methode ;
  private String status;

  public void  setDate(){
    LocalDateTime ldt = LocalDateTime.now();
    // Define the date format as dd/MM/yy
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yy HH:mm");
    this.Date_Payment= ldt.format(formatter);
  }
}
