package org.example.skistation.service.impl;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Cours;
import org.example.skistation.model.Support;
import org.example.skistation.model.TypeCours;
import org.example.skistation.repository.CoursRepository;
import org.example.skistation.repository.InscriptionRepository;
import org.example.skistation.service.ICoursService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class CoursService implements ICoursService {

    private final CoursRepository coursRepository;
    private final InscriptionRepository inscriptionRepository;

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

    @Override
    @Transactional
    public void removeCours(Long numCours) {
        inscriptionRepository.deleteAll(inscriptionRepository.findAllByCours_NumCours(numCours));
        coursRepository.deleteById(numCours);
    }

    @Override
    public List<Cours> retrieveCoursByType(TypeCours typeCours) {
        return coursRepository.findByTypeCours(typeCours);
    }

    @Override
    public List<Cours> retrieveCoursBySupport(Support support) {
        return coursRepository.findBySupport(support);
    }
}
