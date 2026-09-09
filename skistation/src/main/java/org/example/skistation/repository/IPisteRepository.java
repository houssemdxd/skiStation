package org.example.skistation.repository;

import org.example.skistation.model.Piste;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPisteRepository extends JpaRepository<Piste,Long> {
}
