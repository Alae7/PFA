package com._3dsf.marketplace.users.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@FeignClient(name = "WEBPAY")
public interface WebPayClient {

 ///////   Ordre-service

    @PutMapping("/api/clientPayment/fixidUser/{idUser}/{newIduser}")
    public void fixidUser(@PathVariable("idUser") Long idUser, @PathVariable("newIduser") Long newIduser);




}
