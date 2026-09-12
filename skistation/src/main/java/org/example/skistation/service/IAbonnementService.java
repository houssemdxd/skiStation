package org.example.skistation.service;

import org.example.skistation.model.Abonnement;
import org.example.skistation.model.TypeAbonnement;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface IAbonnementService {

     Set<Abonnement> getAbonnementByType(TypeAbonnement type) ;
    List<Abonnement> retrieveAbonnementsByDates(LocalDate startDate, LocalDate endDate);

}
