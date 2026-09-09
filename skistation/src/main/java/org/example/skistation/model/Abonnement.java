package org.example.skistation.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Abonnement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private LocalDate datedebut;
    private LocalDate dateFin;
    private float prixAbon;

    @Enumerated(EnumType.STRING)
    private TypeAbonnement typeAbonnement;

    @OneToOne
    @JoinColumn(name = "skieur_id", unique = true)
    private Skieur skieur;


}
