package org.example.skistation.service.impl;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Moniteur;
import org.example.skistation.repository.MoniteurRepository;
import org.example.skistation.service.IMoniteurService;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class MoniteurService implements IMoniteurService {

    private final MoniteurRepository moniteurRepository;

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
}
