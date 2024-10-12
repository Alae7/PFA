package com.Marketplace.OrdreService.Web.userControllers;

import com.Marketplace.OrdreService.Model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@FeignClient(name = "USER-SERVICE")

public interface UserOpenFeignController {

    @GetMapping("/api/v1/admin/findOneUser/{id}")
    public User findOneUser(@PathVariable("id") Long id);

    @GetMapping("/api/v1/users/{idUser}/cart")
    public Long getUserCart(@PathVariable("idUser") Long idUser);
}
