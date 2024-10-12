package com.Marketplace.OrdreService.Web;

import com.Marketplace.OrdreService.DTO.OrderRequestDTO;
import com.Marketplace.OrdreService.DTO.OrderResponseDTO;
import com.Marketplace.OrdreService.Entities.Status;
import com.Marketplace.OrdreService.Model.User;
import com.Marketplace.OrdreService.Service.OrdreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrdreController {

    @Autowired
    private OrdreService ordreServInter;
    private Long id;

    @PostMapping("/createOrdre/{userid}")
    public Long addOrdre(@PathVariable("userid") Long userid) {
        return ordreServInter.ADD(userid);
    }

    @GetMapping("/oneordres/{id}")
    public ResponseEntity<OrderResponseDTO> getOrdreById(@PathVariable("id") Long id) {
        OrderResponseDTO ordre = ordreServInter.GetoneOrdre(id);
        return ordre != null ? ResponseEntity.ok(ordre) : ResponseEntity.notFound().build();
    }

    @PutMapping("/ordres/{id}")
    public ResponseEntity<Void> fixStatusOrdre(@PathVariable("id") Long id,@RequestBody  Status status) {
        ordreServInter.Update(id,status);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/ordres/{userid}")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrdres(@PathVariable("userid") Long userid ) {
        return ResponseEntity.ok(ordreServInter.GetallOrdre(userid));
    }

    @GetMapping("/ordresadmin")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrdresadmin() {
        return ResponseEntity.ok(ordreServInter.GetallOrdreadmin());
    }


    @DeleteMapping("/ordres/{id}")
    public ResponseEntity<Void> deleteOrdre(@PathVariable Long id) {
        ordreServInter.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable("id") Long id) {

        OrderResponseDTO ordre = ordreServInter.GetoneOrdre(id);

        // Vérifie si l'objet `ordre` n'est pas nul et retourne l'ID de l'utilisateur associé
        return ordre.getUser();
    }

    @PutMapping("/ordres/fixidUser/{idUser}/{newIduser}")
    public void fixidUser(@PathVariable("idUser") Long idUser, @PathVariable("newIduser") Long newIduser) {
        ordreServInter.updateUserordre(idUser,newIduser);
        System.out.println("idUser = "+idUser+" newId user = " + newIduser);
    }

}
