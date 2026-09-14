package org.example.skistation.controller;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Color;
import org.example.skistation.model.Skieur;
import org.example.skistation.model.TypeAbonnement;
import org.example.skistation.service.ISkieurService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/skieur")
public class SkieurController {

    private final ISkieurService skieurService;

    @GetMapping("/all")
    public ResponseEntity<List<Skieur>> getAllSkieurs() {
        return ResponseEntity.ok(skieurService.retrieveAllSkieurs());
    }

    @PostMapping("/add")
    public ResponseEntity<Skieur> addSkieur(@RequestBody Skieur skieur) {
        return ResponseEntity.ok(skieurService.addSkieur(skieur));
    }

    @PutMapping("/update")
    public ResponseEntity<Skieur> updateSkieur(@RequestBody Skieur skieur) {
        return ResponseEntity.ok(skieurService.updateSkieur(skieur));
    }

    @GetMapping("/{numSkieur}")
    public ResponseEntity<Skieur> getSkieur(@PathVariable Long numSkieur) {
        return ResponseEntity.ok(skieurService.retrieveSkieur(numSkieur));
    }

    @DeleteMapping("/{numSkieur}")
    public ResponseEntity<Void> removeSkieur(@PathVariable Long numSkieur) {
        skieurService.removeSkieur(numSkieur);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/assignToPiste/{numSkieur}/{numPiste}")
    public ResponseEntity<Skieur> assignSkieurToPiste(
            @PathVariable Long numSkieur,
            @PathVariable Long numPiste) {
        return ResponseEntity.ok(skieurService.assignSkieurToPiste(numSkieur, numPiste));
    }

    @PostMapping("/addAndAssignToCours/{numCours}")
    public ResponseEntity<Skieur> addSkieurAndAssignToCours(
            @RequestBody Skieur skieur,
            @PathVariable Long numCours) {
        return ResponseEntity.ok(skieurService.addSkieurAndAssignToCours(skieur, numCours));
    }

    @GetMapping("/byTypeAbonnement/{typeAbonnement}")
    public ResponseEntity<List<Skieur>> retrieveSkieursByTypeAbonnement(
            @PathVariable TypeAbonnement typeAbonnement) {
        return ResponseEntity.ok(skieurService.retrieveSkieursByTypeAbonnement(typeAbonnement));
    }

    @GetMapping("/nombreParCouleurPiste")
    public ResponseEntity<HashMap<Color, Integer>> nombreSkieursParCouleurPiste() {
        return ResponseEntity.ok(skieurService.nombreSkieursParCouleurPiste());
    }
}
