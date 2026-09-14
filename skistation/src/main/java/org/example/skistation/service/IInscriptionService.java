package org.example.skistation.service;

import org.example.skistation.model.Inscription;

import java.util.List;

public interface IInscriptionService {

    List<Inscription> retrieveAllInscriptions();

    Inscription retrieveInscription(Long numInscription);

    void removeInscription(Long numInscription);

    List<Inscription> retrieveInscriptionsByCours(Long numCours);

    List<Inscription> retrieveInscriptionsBySkieur(Long numSkieur);

    Inscription assignInscriptionToCours(Long numInscription, Long numCours);

    Inscription addInscriptionAndAssignToSkieurAndCours(
            Inscription inscription,
            Long numSkieur,
            Long numCours);
}
