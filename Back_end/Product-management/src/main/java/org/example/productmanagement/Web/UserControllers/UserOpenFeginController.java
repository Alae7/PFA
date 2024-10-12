package org.example.productmanagement.Web.UserControllers;

import org.example.productmanagement.Model.Seller;
import org.example.productmanagement.Model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@FeignClient(name = "USER-SERVICE")
public interface UserOpenFeginController {

    @GetMapping("/api/v1/admin/findOneUser/{id}")
    public User findOneUser(@PathVariable("id") Long id);

    @GetMapping("/api/v1/seller/{sellerId}")
    public Seller getSeller(@PathVariable("sellerId") Long sellerId);
}
