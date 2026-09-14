package org.example.skistation.controller;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Inscription;
import org.example.skistation.service.IInscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/inscription")
public class InscriptionController {

    private final IInscriptionService inscriptionService;

    @GetMapping("/all")
    public ResponseEntity<List<Inscription>> getAllInscriptions() {
        return ResponseEntity.ok(inscriptionService.retrieveAllInscriptions());
    }

    @GetMapping("/{numInscription}")
    public ResponseEntity<Inscription> getInscription(@PathVariable Long numInscription) {
        return ResponseEntity.ok(inscriptionService.retrieveInscription(numInscription));
    }

    @GetMapping("/byCours/{numCours}")
    public ResponseEntity<List<Inscription>> getInscriptionsByCours(@PathVariable Long numCours) {
        return ResponseEntity.ok(inscriptionService.retrieveInscriptionsByCours(numCours));
    }

    @GetMapping("/bySkieur/{numSkieur}")
    public ResponseEntity<List<Inscription>> getInscriptionsBySkieur(@PathVariable Long numSkieur) {
        return ResponseEntity.ok(inscriptionService.retrieveInscriptionsBySkieur(numSkieur));
    }

    @DeleteMapping("/{numInscription}")
    public ResponseEntity<Void> removeInscription(@PathVariable Long numInscription) {
        inscriptionService.removeInscription(numInscription);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/assignToCours/{numInscription}/{numCours}")
    public ResponseEntity<Inscription> assignInscriptionToCours(
            @PathVariable Long numInscription,
            @PathVariable Long numCours) {
        return ResponseEntity.ok(inscriptionService.assignInscriptionToCours(numInscription, numCours));
    }

    @PostMapping("/addAndAssign/{numSkieur}/{numCours}")
    public ResponseEntity<Inscription> addInscriptionAndAssignToSkieurAndCours(
            @RequestBody Inscription inscription,
            @PathVariable Long numSkieur,
            @PathVariable Long numCours) {
        return ResponseEntity.ok(
                inscriptionService.addInscriptionAndAssignToSkieurAndCours(inscription, numSkieur, numCours));
    }
}
