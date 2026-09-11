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
public class Moniteur {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long numMoniteur;
    private String nomM;
    private String prenomM;
    private LocalDate dateRecus;

    @JsonIgnore
    @OneToOne(mappedBy = "moniteur")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "moniteur")
    private List<Cours> cours;
}
