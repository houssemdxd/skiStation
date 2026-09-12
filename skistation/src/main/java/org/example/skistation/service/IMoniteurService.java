package org.example.skistation.service;

import org.example.skistation.model.Moniteur;
import org.example.skistation.model.Support;

import java.util.List;

public interface IMoniteurService {

    List<Moniteur> retrieveAllMoniteurs();

    Moniteur addMoniteur(Moniteur moniteur);

    Moniteur updateMoniteur(Moniteur moniteur);

    Moniteur retrieveMoniteur(Long numMoniteur);
    Moniteur addMoniteurAndAssignToCours(Moniteur moniteur, Long numCours);
    List<Integer> numWeeksCourseOfMoniteurBySupport(
            Long numMoniteur,
            Support support);
    Moniteur bestMoiteur();
}
