package org.example.skistation.service;

import org.example.skistation.model.Moniteur;

import java.util.List;

public interface IMoniteurService {

    List<Moniteur> retrieveAllMoniteurs();

    Moniteur addMoniteur(Moniteur moniteur);

    Moniteur updateMoniteur(Moniteur moniteur);

    Moniteur retrieveMoniteur(Long numMoniteur);
}
