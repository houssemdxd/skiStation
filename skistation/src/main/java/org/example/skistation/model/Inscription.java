package org.example.skistation.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
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
