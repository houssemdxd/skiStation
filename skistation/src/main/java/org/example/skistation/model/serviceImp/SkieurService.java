package org.example.skistation.model.serviceImp;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Abonnement;
import org.example.skistation.model.Skieur;
import org.example.skistation.repository.SkieurRepository;
import org.example.skistation.service.ISkieurService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class SkieurService implements ISkieurService {

    private final SkieurRepository skieurRepository;

    @Override
    public List<Skieur> retrieveAllSkieurs() {
        return skieurRepository.findAll();
    }

    @Override
    @Transactional
    public Skieur addSkieur(Skieur skieur) {
        Abonnement abonnement = skieur.getAbonnement();
        if (abonnement != null) {
            abonnement.setSkieur(skieur);
        }
        return skieurRepository.save(skieur);
    }

    @Override
    @Transactional
    public void removeSkieur(Long numSkieur) {
        skieurRepository.deleteById(numSkieur);
    }

    @Override
    public Skieur retrieveSkieur(Long numSkieur) {
        return skieurRepository.findById(numSkieur).orElse(null);
    }
}
