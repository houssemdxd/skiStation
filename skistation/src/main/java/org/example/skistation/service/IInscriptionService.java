package org.example.skistation.service;

import org.example.skistation.model.Inscription;

public interface IInscriptionService {
    Inscription assignInscriptionToCours(Long numInscription, Long numCours);

    Inscription addInscriptionAndAssignToSkieurAndCours(
            Inscription inscription,
            Long numSkieur,
            Long numCours);
}
