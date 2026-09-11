package org.example.skistation.controller;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Piste;
import org.example.skistation.service.IpisteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/piste")
public class PisteController {

    private final IpisteService pisteService;

    @GetMapping("/all")
    public ResponseEntity<List<Piste>> getAllPistes() {
        return ResponseEntity.ok(pisteService.retreiveAllPistes());
    }

    @PostMapping("/add")
    public ResponseEntity<Piste> addPiste(@RequestBody Piste piste) {
        return ResponseEntity.ok(pisteService.addPiste(piste));
    }

    @PutMapping("/update")
    public ResponseEntity<Piste> updatePiste(@RequestBody Piste piste) {
        return ResponseEntity.ok(pisteService.UpdatePist(piste));
    }

    @GetMapping("/{numPiste}")
    public ResponseEntity<Piste> getPiste(@PathVariable Long numPiste) {
        return ResponseEntity.ok(pisteService.retreivePist(numPiste));
    }

    @DeleteMapping("/{numPiste}")
    public ResponseEntity<Void> deletePiste(@PathVariable Long numPiste) {
        pisteService.deletePiste(numPiste);
        return ResponseEntity.noContent().build();
    }

}
