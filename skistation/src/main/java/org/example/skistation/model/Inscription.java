package org.example.skistation.model;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
public class Inscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long numInscription ;

    private  int numSemaine;

    @ManyToOne
    @JoinColumn(name = "skieur_id")
    private Skieur skieur;

    @ManyToOne
    private Cours cours ;


}
