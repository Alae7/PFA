package org.example.vente.web;

import org.example.vente.Entities.Status;
import org.example.vente.Entities.Vente;
import org.example.vente.Repistory.RepositoryVente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class VenteContoller {

    @Autowired
    private RepositoryVente venteRepository;





    // Récupérer toutes les ventes
    @GetMapping("/vente")
    public List<Vente> getAllVentes() {
        return venteRepository.findAll();
    }

    // Récupérer une vente par ID
    @GetMapping("/vente/{id}")
    public ResponseEntity<Vente> getVenteById(@PathVariable Long id) {
        Optional<Vente> vente = venteRepository.findById(id);
        return vente.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Créer une nouvelle vente
    @PostMapping("/vente")
    public Vente createVente(@RequestBody Vente vente) {
        return venteRepository.save(vente);
    }

    // Supprimer une vente par ID
    @DeleteMapping("/vente/{id}")
    public ResponseEntity<Void> deleteVente(@PathVariable Long id) {
        Optional<Vente> vente = venteRepository.findById(id);
        if (vente.isPresent()) {
            venteRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // Retourne 204 No Content si supprimé
        } else {
            return ResponseEntity.notFound().build();  // Retourne 404 si non trouvé
        }
    }
    // update Status
    @PutMapping("/vente/deliver/{id}")
    public ResponseEntity<String> updateVenteStatusToDelivered(@PathVariable Long id) {
        Optional<Vente> venteOptional = venteRepository.findById(id);

        if (!venteOptional.isPresent()) {
            return ResponseEntity.notFound().build(); // Retourner 404 si la vente n'est pas trouvée
        }

        Vente vente = venteOptional.get();

        // Vérifier si le statut est 'Pending'
        if (vente.getStatus() == Status.Pending) {
            vente.setStatus(Status.delivred); // Mettre à jour le statut en 'Delivered'
            venteRepository.save(vente); // Enregistrer les modifications
            return ResponseEntity.ok("Vente mise à jour au statut 'Delivered'");
        } else {
            return ResponseEntity.badRequest().body("Le statut de la vente n'est pas 'Pending'"); // Retourner 400 si la vente n'est pas en statut 'Pending'
        }
    }

    // Récupérer les ventes par idSeller (un vendeur peut avoir plusieurs ventes)
    @GetMapping("/vente/seller/{idSeller}")
    public ResponseEntity<List<Vente>> getVentesBySellerId(@PathVariable Long idSeller) {
        List<Vente> ventes = venteRepository.findByIdSeller(idSeller);

        // Si des ventes sont trouvées, les retourner
        if (!ventes.isEmpty()) {
            return ResponseEntity.ok(ventes);  // Renvoie 200 OK avec la liste des ventes
        } else {
            return ResponseEntity.notFound().build();  // Renvoie 404 si aucune vente n'est trouvée
        }
    }

}
