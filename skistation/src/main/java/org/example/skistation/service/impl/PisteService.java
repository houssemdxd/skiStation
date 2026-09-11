package org.example.skistation.service.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.skistation.model.Piste;
import org.example.skistation.repository.PisteRepository;
import org.example.skistation.service.IpisteService;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class PisteService implements IpisteService {

    final private PisteRepository pisteRepository;

    @Override
    public List<Piste> retreiveAllPistes() {
        return  pisteRepository.findAll() ;
    }

    @Override
    public Piste addPiste(Piste piste) {
        return pisteRepository.save(piste);
    }

    @Override
    public Piste UpdatePist(Piste piste) {
        return pisteRepository.save(piste);
    }

    @Override
    public Piste retreivePist(Long numPiste) {
        return pisteRepository.findById(numPiste).orElse(null);
    }
    @Override
    public void deletePiste(Long numPiste) {
        pisteRepository.deleteById(numPiste);
    }
}
