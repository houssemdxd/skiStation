package org.example.skistation.service.impl;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Cours;
import org.example.skistation.model.Inscription;
import org.example.skistation.model.Skieur;
import org.example.skistation.model.TypeCours;
import org.example.skistation.repository.CoursRepository;
import org.example.skistation.repository.InscriptionRepository;
import org.example.skistation.repository.SkieurRepository;
import org.example.skistation.service.ICoursService;
import org.example.skistation.service.IInscriptionService;
import org.example.skistation.service.ISkieurService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class InscriptionService implements IInscriptionService {

    private final InscriptionRepository inscriptionRepository;
    private final CoursRepository coursRepository;
    private final SkieurRepository skieurRepository;


    @Override
    public Inscription assignInscriptionToCours(Long numInscription, Long numCours) {

        Inscription inscription = inscriptionRepository.findById(numInscription)
                .orElseThrow(() -> new RuntimeException("Inscription not found"));

        Cours cours = coursRepository.findById(numCours)
                .orElseThrow(() -> new RuntimeException("Cours not found"));

        inscription.setCours(cours);
        cours.getInscription().add(inscription);

        inscriptionRepository.save(inscription);

        return inscription;
    }

    @Override
    public Inscription addInscriptionAndAssignToSkieurAndCours(
            Inscription inscription,
            Long numSkieur,
            Long numCours) {

        Skieur skieur = skieurRepository.findById(numSkieur)
                .orElseThrow(() -> new RuntimeException("Skieur not found"));

        Cours cours = coursRepository.findById(numCours)
                .orElseThrow(() -> new RuntimeException("Cours not found"));

        // Vérification de l'âge du skieur
        // selon le type du cours

        // Vérification du nombre de skieurs
        if (cours.getTypeCours() == TypeCours.COLLECTIF_ENFANT
                || cours.getTypeCours() == TypeCours.COLLECTIF_ADULTE) {

            long nombreSkieurs = inscriptionRepository
                    .countByCoursNumCours(numCours);

            if (nombreSkieurs >= 6) {
                throw new RuntimeException(
                        "Le cours collectif est déjà complet"
                );
            }
        }

        inscription.setSkieur(skieur);
        inscription.setCours(cours);

        return inscriptionRepository.save(inscription);
    }
}
