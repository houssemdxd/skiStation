package org.example.skistation.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
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
    @JsonIgnore
    @ManyToMany(mappedBy = "pistes")
    private List<Skieur> skieurs;


}
