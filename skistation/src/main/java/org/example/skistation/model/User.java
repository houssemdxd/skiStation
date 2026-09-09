package org.example.skistation.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
@Column(unique = true,nullable = false)
private String username;
@Column(nullable = false)
private String password ;
@Enumerated(EnumType.STRING)
@Column(nullable = false)
private Role role ;
@OneToOne
@JoinColumn(name = "skieur_id")
private Skieur skieur;
@OneToOne
@JoinColumn(name = "moniteur_id")
private Moniteur moniteur ;



}
