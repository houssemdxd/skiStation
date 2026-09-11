package org.example.skistation.service.impl;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Cours;
import org.example.skistation.repository.CoursRepository;
import org.example.skistation.service.ICoursService;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CoursService implements ICoursService {

    private final CoursRepository coursRepository;

    @Override
    public List<Cours> retrieveAllCourses() {
        return coursRepository.findAll();
    }

    @Override
    public Cours addCours(Cours cours) {
        return coursRepository.save(cours);
    }

    @Override
    public Cours updateCours(Cours cours) {
        return coursRepository.save(cours);
    }

    @Override
    public Cours retrieveCours(Long numCours) {
        return coursRepository.findById(numCours).orElse(null);
    }
}
