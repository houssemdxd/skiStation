package org.example.skistation.repository;

import org.example.skistation.model.Piste;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PisteRepository extends JpaRepository<Piste,Long> {
}
