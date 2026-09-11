package org.example.skistation.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private Long id;
    private LocalDate datedebut;
    private LocalDate dateFin;
    private float prixAbon;

    @Enumerated(EnumType.STRING)
    private TypeAbonnement typeAbonnement;

    @JsonIgnore
    @OneToOne(mappedBy = "abonnement")
    private Skieur skieur;
}
