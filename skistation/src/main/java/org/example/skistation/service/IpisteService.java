package org.example.skistation.service;

import org.example.skistation.model.Piste;

import java.util.List;

public interface IpisteService {

    List<Piste> retreiveAllPistes();
    Piste addPiste(Piste piste);
    Piste UpdatePist(Piste piste);
    Piste retreivePist(Long numPiste);

    public void deletePiste(Long numPiste);
}
