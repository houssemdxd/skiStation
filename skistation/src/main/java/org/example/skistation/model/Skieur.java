package org.example.skistation.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @OneToOne(mappedBy = "skieur")
    private User user;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "abonnement_id")
    private Abonnement abonnement;

    @JsonIgnore
    @OneToMany(mappedBy = "skieur")
    private List<Inscription> inscriptions;

    @JsonIgnore
    @ManyToMany
    private List<Piste> pistes;
}
