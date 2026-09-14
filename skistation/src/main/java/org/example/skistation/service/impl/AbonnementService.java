package org.example.skistation.service.impl;

import lombok.AllArgsConstructor;
import org.example.skistation.model.Abonnement;
import org.example.skistation.model.TypeAbonnement;
import org.example.skistation.repository.AbonnementRepository;
import org.example.skistation.service.IAbonnementService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class AbonnementService implements IAbonnementService {

    private final AbonnementRepository abonnementRepository;

    @Override
    public List<Abonnement> retrieveAllAbonnements() {
        return abonnementRepository.findAll();
    }

    @Override
    public Abonnement retrieveAbonnement(Long id) {
        return abonnementRepository.findById(id).orElse(null);
    }

    @Override
    public Abonnement updateAbonnement(Abonnement incoming) {
        Abonnement existing = abonnementRepository.findById(incoming.getId())
                .orElseThrow(() -> new RuntimeException("abonnement not found"));
        if (incoming.getDatedebut() != null) {
            existing.setDatedebut(incoming.getDatedebut());
        }
        if (incoming.getDateFin() != null) {
            existing.setDateFin(incoming.getDateFin());
        }
        if (incoming.getTypeAbonnement() != null) {
            existing.setTypeAbonnement(incoming.getTypeAbonnement());
        }
        existing.setPrixAbon(incoming.getPrixAbon());
        return abonnementRepository.save(existing);
    }

    @Override
    public Set<Abonnement> getAbonnementByType(TypeAbonnement type) {
        return abonnementRepository.findByTypeAbonnementOrderByDatedebutAsc(type);
    }

    @Override
    public List<Abonnement> retrieveAbonnementsByDates(LocalDate startDate, LocalDate endDate) {
        return abonnementRepository.findByDatedebutBetween(startDate, endDate);
    }
}
