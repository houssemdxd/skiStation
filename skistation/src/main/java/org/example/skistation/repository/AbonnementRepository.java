package org.example.skistation.repository;

import org.example.skistation.model.Abonnement;
import org.example.skistation.model.TypeAbonnement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Set;

public interface AbonnementRepository extends JpaRepository<Abonnement, Long> {

    Set<Abonnement> findByTypeAbonnementOrderByDatedebutAsc(TypeAbonnement type);
    List<Abonnement> findByDatedebutBetween(LocalDate dateDebut, LocalDate Datefin);

}
