package com.backend.backend.service;

import com.backend.backend.dtos.PotHoleDto;
import com.backend.backend.exceptions.PotHoleNotFoundException;
import com.backend.backend.model.PotHole;
import com.backend.backend.repository.PotHoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PotHoleService {
    private final PotHoleRepository potHoleRepository;

    @Autowired
    public PotHoleService(PotHoleRepository potHoleRepository) {
        this.potHoleRepository = potHoleRepository;
    }

    private PotHoleDto mapToDto(PotHole potHole) {
        PotHoleDto potHoleDto = new PotHoleDto();
        potHoleDto.setLongitude(potHole.getLongitude());
        potHoleDto.setLatitude(potHole.getLatitude());
        potHoleDto.setUpvotes(potHole.getUpvotes());
        potHoleDto.setDownvotes(potHole.getDownvotes());
        potHoleDto.setSeverity(potHole.getSeverity());
        potHoleDto.setImageUrl(potHoleDto.getImageUrl());
        return potHoleDto;
    }

    public List<PotHoleDto> getAllPotHoles() {
        return this.potHoleRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public PotHoleDto getPotHoleById(Long id) {
        PotHole potHole = this.potHoleRepository.findById(id)
                .orElseThrow(() -> new PotHoleNotFoundException("PotHole with associated id " + id + " not found"));
        return mapToDto(potHole);
    }

    public PotHoleDto createPotHole(PotHoleDto potHoleDto) {
        PotHole potHole = new PotHole();
        potHole.setLatitude(potHoleDto.getLatitude());
        potHole.setLongitude(potHoleDto.getLongitude());
        potHole.setImageUrl(potHoleDto.getImageUrl());
        potHole.setSeverity(potHoleDto.getSeverity());
        potHole.setUpvotes(potHoleDto.getUpvotes() != null ? potHoleDto.getUpvotes() : 0);
        potHole.setDownvotes(potHoleDto.getDownvotes() != null ? potHoleDto.getDownvotes() : 0);
        this.potHoleRepository.save(potHole);
        return mapToDto(potHole);
    }

    public PotHoleDto updatePotHole(PotHoleDto potHoleDto, Long id) {
        PotHole potHole = this.potHoleRepository.findById(id)
                .orElseThrow(() -> new PotHoleNotFoundException("PotHole with associated id " + id + " not found"));
        potHole.setLatitude(potHoleDto.getLatitude());
        potHole.setLongitude(potHoleDto.getLongitude());
        potHole.setImageUrl(potHoleDto.getImageUrl());
        potHole.setSeverity(potHoleDto.getSeverity());
        potHole.setUpvotes(potHoleDto.getUpvotes());
        potHole.setDownvotes(potHoleDto.getDownvotes());
        this.potHoleRepository.save(potHole);
        return mapToDto(potHole);
    }

    public void deletePotHoleById(Long id) {
        PotHole potHole = this.potHoleRepository.findById(id)
                .orElseThrow(() -> new PotHoleNotFoundException("PotHole with associated id " + id + " not found"));
        this.potHoleRepository.delete(potHole);
    }

}
