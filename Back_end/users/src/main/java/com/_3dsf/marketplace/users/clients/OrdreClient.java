package com._3dsf.marketplace.users.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;


@FeignClient(name = "ORDRE-SERVICE")
public interface OrdreClient {

 ///////   Ordre-service

    @PutMapping("/api/ordres/fixidUser/{idUser}/{newIduser}")
    public void fixidUser(@PathVariable("idUser") Long idUser, @PathVariable("newIduser") Long newIduser);




}
