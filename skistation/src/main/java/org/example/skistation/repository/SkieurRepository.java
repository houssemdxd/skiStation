package org.example.skistation.repository;

import org.example.skistation.model.Skieur;
import org.example.skistation.model.TypeAbonnement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkieurRepository extends JpaRepository<Skieur, Long> {
    List<Skieur> findByAbonnementTypeAbonnement(TypeAbonnement typeAbonnement);
}
