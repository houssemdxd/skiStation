package org.example.skistation.model;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.List;
@NoArgsConstructor
@Entity
public class Piste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long numPiste;

    private String nomPiste;
    @Enumerated(EnumType.STRING)

    private Color color ;

    private int Longeur;

    private  int pente;
    @ManyToMany(mappedBy = "pistes")
    private List<Skieur> skieurs;


}
