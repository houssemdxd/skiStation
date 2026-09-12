package org.example.skistation.service;

import org.example.skistation.model.Color;
import org.example.skistation.model.Skieur;
import org.example.skistation.model.TypeAbonnement;

import java.util.HashMap;
import java.util.List;

public interface ISkieurService {

    List<Skieur> retrieveAllSkieurs();

    Skieur addSkieur(Skieur skieur);

    void removeSkieur(Long numSkieur);

    Skieur retrieveSkieur(Long numSkieur);
    Skieur assignSkieurToPiste(Long numSkieur, Long numPiste);
    Skieur addSkieurAndAssignToCours(Skieur skieur, Long numCours);
    List<Skieur> retrieveSkieursByTypeAbonnement(TypeAbonnement typeAbonnement);
    HashMap<Color, Integer> nombreSkieursParCouleurPiste();
}
