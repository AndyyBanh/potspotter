package com.backend.backend.service;

import com.backend.backend.dto.PotHoleDto;
import com.backend.backend.exceptions.PotHoleNotFoundException;
import com.backend.backend.model.PotHole;
import com.backend.backend.repository.PotHoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PotHoleService {
    private final PotHoleRepository potHoleRepository;
    private final CloudinaryService cloudinaryService;

    @Autowired
    public PotHoleService(PotHoleRepository potHoleRepository, CloudinaryService cloudinaryService) {
        this.potHoleRepository = potHoleRepository;
        this.cloudinaryService = cloudinaryService;
    }

    private PotHoleDto mapToDto(PotHole potHole) {
        PotHoleDto potHoleDto = new PotHoleDto();
        potHoleDto.setId(potHole.getId());
        potHoleDto.setLongitude(potHole.getLongitude());
        potHoleDto.setLatitude(potHole.getLatitude());
        potHoleDto.setUpvotes(potHole.getUpvotes());
        potHoleDto.setDownvotes(potHole.getDownvotes());
        potHoleDto.setSeverity(potHole.getSeverity());
        potHoleDto.setImageUrl(potHole.getImageUrl());
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

    public PotHoleDto createPotHole(MultipartFile file, Double latitude, Double longitude, Integer severity) throws IOException {
        String imageUrl = this.cloudinaryService.uploadImage(file);

        PotHole potHole = new PotHole();
        potHole.setLatitude(latitude);
        potHole.setLongitude(longitude);
        potHole.setImageUrl(imageUrl);
        potHole.setSeverity(severity);
        potHole.setUpvotes(0);
        potHole.setDownvotes(0);
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

    public PotHoleDto upvote(Long id) {
        PotHole potHole = this.potHoleRepository.findById(id)
                .orElseThrow(() -> new PotHoleNotFoundException("PotHole with associated id " + id + " not found"));
        potHole.setUpvotes((potHole.getUpvotes() != null ? potHole.getUpvotes() : 0) + 1);
        this.potHoleRepository.save(potHole);
        return mapToDto(potHole);
    }

    public PotHoleDto downvote(Long id) {
        PotHole potHole = this.potHoleRepository.findById(id)
                .orElseThrow(() -> new PotHoleNotFoundException("PotHole with associated id " + id + " not found"));
        potHole.setDownvotes((potHole.getDownvotes() != null ? potHole.getDownvotes() : 0) + 1);
        this.potHoleRepository.save(potHole);
        return mapToDto(potHole);
    }

}
