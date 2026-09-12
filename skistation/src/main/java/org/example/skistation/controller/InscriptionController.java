package org.example.skistation.controller;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Inscription;
import org.example.skistation.service.IInscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/inscription")
public class InscriptionController {

    private final IInscriptionService inscriptionService;

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
