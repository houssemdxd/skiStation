package org.example.skistation.service.impl;

import lombok.AllArgsConstructor;
import org.example.skistation.model.*;
import org.example.skistation.repository.CoursRepository;
import org.example.skistation.repository.InscriptionRepository;
import org.example.skistation.repository.PisteRepository;
import org.example.skistation.repository.SkieurRepository;
import org.example.skistation.service.ISkieurService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Service
public class SkieurService implements ISkieurService {

    private final SkieurRepository skieurRepository;
    private final PisteRepository pisteRepository;
    private final InscriptionRepository inscriptionRepository;
    private final CoursRepository coursRepository;



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
    public Skieur updateSkieur(Skieur incoming) {
        Skieur existing = skieurRepository.findById(incoming.getNumSkieur())
                .orElseThrow(() -> new RuntimeException("skieur not found"));
        existing.setNomS(incoming.getNomS());
        existing.setPrenomS(incoming.getPrenomS());
        existing.setDateNaissance(incoming.getDateNaissance());
        existing.setVille(incoming.getVille());
        if (incoming.getAbonnement() != null) {
            Abonnement abonnement = existing.getAbonnement();
            if (abonnement == null) {
                existing.setAbonnement(incoming.getAbonnement());
            } else {
                Abonnement updated = incoming.getAbonnement();
                if (updated.getDatedebut() != null) {
                    abonnement.setDatedebut(updated.getDatedebut());
                }
                if (updated.getDateFin() != null) {
                    abonnement.setDateFin(updated.getDateFin());
                }
                if (updated.getTypeAbonnement() != null) {
                    abonnement.setTypeAbonnement(updated.getTypeAbonnement());
                }
                abonnement.setPrixAbon(updated.getPrixAbon());
            }
        }
        return skieurRepository.save(existing);
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

    @Override
    public Skieur assignSkieurToPiste(Long numSkieur, Long numPiste) {
        Skieur skieur = skieurRepository.findById(numSkieur).orElseThrow(()->new RuntimeException("skieur not found"));
        Piste piste = pisteRepository.findById(numPiste).orElseThrow(()->new RuntimeException("numPiste not found"));
        skieur.getPistes().add(piste);
        piste.getSkieurs().add(skieur);
       return  skieurRepository.save(skieur);

    }

    @Override
    public Skieur addSkieurAndAssignToCours(Skieur skieur, Long numCours) {

        Skieur savedSkieur = addSkieur(skieur);

        Cours cours = coursRepository.findById(numCours)
                .orElseThrow(() -> new RuntimeException("Cours not found"));

        Inscription inscription = new Inscription();

        inscription.setSkieur(savedSkieur);
        inscription.setCours(cours);

        inscriptionRepository.save(inscription);

        savedSkieur.getInscriptions().add(inscription);

        return savedSkieur;
    }

    @Override
    public List<Skieur> retrieveSkieursByTypeAbonnement(TypeAbonnement typeAbonnement) {
        return skieurRepository.findByAbonnementTypeAbonnement(typeAbonnement);
    }

    @Override
    public HashMap<Color, Integer> nombreSkieursParCouleurPiste() {

        List<Skieur> skieurs = retrieveAllSkieurs();
        HashMap<Color, Integer> skieurMap = new HashMap<>();

        for (Color c : Color.values()) {
            int nb = (int) skieurs.stream()
                    .filter(s -> s.getPistes().stream()
                            .anyMatch(p -> p.getColor() == c))
                    .count();

            skieurMap.put(c, nb);
        }

        return skieurMap;
    }


}
