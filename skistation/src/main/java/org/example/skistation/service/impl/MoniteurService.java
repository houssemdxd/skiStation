package org.example.skistation.service.impl;

import lombok.AllArgsConstructor;
import org.example.skistation.model.*;
import org.example.skistation.repository.CoursRepository;
import org.example.skistation.repository.InscriptionRepository;
import org.example.skistation.repository.MoniteurRepository;
import org.example.skistation.service.IMoniteurService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.hibernate.internal.util.collections.ArrayHelper.forEach;

@AllArgsConstructor
@Service
public class MoniteurService implements IMoniteurService {

    private final MoniteurRepository moniteurRepository;
    private final CoursRepository coursRepository;
    private final InscriptionRepository inscriptionRepository;


    @Override
    public List<Moniteur> retrieveAllMoniteurs() {
        return moniteurRepository.findAll();
    }

    @Override
    public Moniteur addMoniteur(Moniteur moniteur) {
        return moniteurRepository.save(moniteur);
    }

    @Override
    public Moniteur updateMoniteur(Moniteur moniteur) {
        return moniteurRepository.save(moniteur);
    }

    @Override
    public Moniteur retrieveMoniteur(Long numMoniteur) {
        return moniteurRepository.findById(numMoniteur).orElse(null);
    }

    @Override
    @Transactional
    public Moniteur addMoniteurAndAssignToCours(Moniteur moniteur, Long numCours) {

        Cours cours = coursRepository.findById(numCours)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Moniteur savedMoniteur = moniteurRepository.save(moniteur);

        cours.setMoniteur(savedMoniteur);

        coursRepository.save(cours);

        return savedMoniteur;
    }


    @Override
    public List<Integer> numWeeksCourseOfMoniteurBySupport(
            Long numMoniteur,
            Support support) {

        Moniteur moniteur = moniteurRepository.findById(numMoniteur)
                .orElseThrow(() -> new RuntimeException("Moniteur not found"));

        List<Integer> weeks = new ArrayList<>();

        for (Cours cours : moniteur.getCours()) {

            if (cours.getSupport() == support) {

                for (Inscription inscription : cours.getInscription()) {
                    weeks.add(inscription.getNumSemaine());
                }
            }
        }

        return weeks;
    }



    @Override
    public Moniteur bestMoiteur(){

        List<Moniteur> moniteurs = retrieveAllMoniteurs();
        if(moniteurs.size() == 0)
            throw new RuntimeException("There are no moniteurs");
        Moniteur bestMoniteur  = moniteurs.getFirst();
        for(Moniteur moniteur : moniteurs){

            if (moniteur.getCours().size()>bestMoniteur.getCours().size())
                bestMoniteur = moniteur;

        }

        bestMoniteur.setPrime(1000);
        return moniteurRepository.save(bestMoniteur);



    }
}
