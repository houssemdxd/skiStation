package org.example.skistation.model.serviceImp.controller;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Cours;
import org.example.skistation.service.ICoursService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/cours")
public class CoursController {

    private final ICoursService coursService;

    @GetMapping("/all")
    public ResponseEntity<List<Cours>> getAllCourses() {
        return ResponseEntity.ok(coursService.retrieveAllCourses());
    }

    @PostMapping("/add")
    public ResponseEntity<Cours> addCours(@RequestBody Cours cours) {
        return ResponseEntity.ok(coursService.addCours(cours));
    }

    @PutMapping("/update")
    public ResponseEntity<Cours> updateCours(@RequestBody Cours cours) {
        return ResponseEntity.ok(coursService.updateCours(cours));
    }

    @GetMapping("/{numCours}")
    public ResponseEntity<Cours> getCours(@PathVariable Long numCours) {
        return ResponseEntity.ok(coursService.retrieveCours(numCours));
    }
}
