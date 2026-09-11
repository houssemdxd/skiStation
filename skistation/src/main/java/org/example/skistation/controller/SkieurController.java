package org.example.skistation.controller;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Skieur;
import org.example.skistation.service.ISkieurService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{numSkieur}")
    public ResponseEntity<Skieur> getSkieur(@PathVariable Long numSkieur) {
        return ResponseEntity.ok(skieurService.retrieveSkieur(numSkieur));
    }

    @DeleteMapping("/{numSkieur}")
    public ResponseEntity<Void> removeSkieur(@PathVariable Long numSkieur) {
        skieurService.removeSkieur(numSkieur);
        return ResponseEntity.noContent().build();
    }
}
