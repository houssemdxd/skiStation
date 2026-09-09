package org.example.skistation.model;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Entity
public class Cours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numCours;
    private  int niveau ;
    private TypeCours typeCours;
    private Support support;
    private float prix ;
    private  int creanau;
    @OneToMany(mappedBy = "cours")
    private List<Inscription> inscription;
    @ManyToOne
    private Moniteur moniteur;

}
