package org.example.skistation.controller;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Moniteur;
import org.example.skistation.model.Support;
import org.example.skistation.service.IMoniteurService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/moniteur")
public class MoniteurController {

    private final IMoniteurService moniteurService;

    @GetMapping("/all")
    public ResponseEntity<List<Moniteur>> getAllMoniteurs() {
        return ResponseEntity.ok(moniteurService.retrieveAllMoniteurs());
    }

    @PostMapping("/add")
    public ResponseEntity<Moniteur> addMoniteur(@RequestBody Moniteur moniteur) {
        return ResponseEntity.ok(moniteurService.addMoniteur(moniteur));
    }

    @PutMapping("/update")
    public ResponseEntity<Moniteur> updateMoniteur(@RequestBody Moniteur moniteur) {
        return ResponseEntity.ok(moniteurService.updateMoniteur(moniteur));
    }

    @GetMapping("/{numMoniteur}")
    public ResponseEntity<Moniteur> getMoniteur(@PathVariable Long numMoniteur) {
        return ResponseEntity.ok(moniteurService.retrieveMoniteur(numMoniteur));
    }

    @PostMapping("/addAndAssignToCours/{numCours}")
    public ResponseEntity<Moniteur> addMoniteurAndAssignToCours(
            @RequestBody Moniteur moniteur,
            @PathVariable Long numCours) {
        return ResponseEntity.ok(moniteurService.addMoniteurAndAssignToCours(moniteur, numCours));
    }

    @GetMapping("/weeks/{numMoniteur}/{support}")
    public ResponseEntity<List<Integer>> numWeeksCourseOfMoniteurBySupport(
            @PathVariable Long numMoniteur,
            @PathVariable Support support) {
        return ResponseEntity.ok(moniteurService.numWeeksCourseOfMoniteurBySupport(numMoniteur, support));
    }

    @PutMapping("/best")
    public ResponseEntity<Moniteur> bestMoiteur() {
        return ResponseEntity.ok(moniteurService.bestMoiteur());
    }
}
