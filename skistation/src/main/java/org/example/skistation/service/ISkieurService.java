package org.example.skistation.service;

import org.example.skistation.model.Skieur;

import java.util.List;

public interface ISkieurService {

    List<Skieur> retrieveAllSkieurs();

    Skieur addSkieur(Skieur skieur);

    void removeSkieur(Long numSkieur);

    Skieur retrieveSkieur(Long numSkieur);
}
