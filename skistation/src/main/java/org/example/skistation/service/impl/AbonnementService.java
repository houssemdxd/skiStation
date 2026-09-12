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
    public Set<Abonnement> getAbonnementByType(TypeAbonnement type) {
        return abonnementRepository.findByTypeAbonnementOrderByDatedebutAsc(type);
    }

    @Override
    public List<Abonnement> retrieveAbonnementsByDates(LocalDate startDate, LocalDate endDate) {
        return abonnementRepository.findByDatedebutBetween(startDate, endDate);
    }
}
