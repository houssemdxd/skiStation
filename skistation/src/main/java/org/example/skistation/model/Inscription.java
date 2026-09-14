package org.example.skistation.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Inscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numInscription;

    private int numSemaine;

    @ManyToOne
    @JoinColumn(name = "skieur_id")
    @JsonIgnoreProperties({"user", "inscriptions", "pistes"})
    private Skieur skieur;

    @ManyToOne
    private Cours cours;
}
