package org.example.skistation.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Skieur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numSkieur;

    private String nomS;

    private String prenomS;

    private LocalDate dateNaissance;

    private String ville;

    @OneToOne(mappedBy = "skieur")
    private User user ;

    @OneToOne(mappedBy = "skieur")
    private  Abonnement abonnement;

    @OneToMany(mappedBy = "skieur")
    List<Inscription> inscriptions;
    @ManyToMany
    private List<Piste> pistes;


}
