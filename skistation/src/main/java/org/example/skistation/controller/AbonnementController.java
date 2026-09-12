package org.example.skistation.controller;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Abonnement;
import org.example.skistation.model.TypeAbonnement;
import org.example.skistation.service.IAbonnementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@RestController
@RequestMapping("/abonnement")
public class AbonnementController {

    private final IAbonnementService abonnementService;

    @GetMapping("/byType/{type}")
    public ResponseEntity<Set<Abonnement>> getAbonnementByType(@PathVariable TypeAbonnement type) {
        return ResponseEntity.ok(abonnementService.getAbonnementByType(type));
    }

    @GetMapping("/byDates")
    public ResponseEntity<List<Abonnement>> retrieveAbonnementsByDates(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        return ResponseEntity.ok(abonnementService.retrieveAbonnementsByDates(startDate, endDate));
    }
}
