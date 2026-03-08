package com.backend.backend.controller;

import com.backend.backend.dto.PotHoleDto;
import com.backend.backend.service.PotHoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/pothole")
public class PotHoleController {
    private final PotHoleService potHoleService;

    @Autowired
    public PotHoleController(PotHoleService potHoleService) {
        this.potHoleService = potHoleService;
    }

    @GetMapping
    public ResponseEntity<List<PotHoleDto>> getAllPotHoles() {
        return ResponseEntity.ok(this.potHoleService.getAllPotHoles());
    }

    @GetMapping("{id}")
    public ResponseEntity<PotHoleDto> getPotHoleById(@PathVariable Long id) {
        return ResponseEntity.ok(this.potHoleService.getPotHoleById(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PotHoleDto> createPotHole(
            @RequestParam("file") MultipartFile file,
            @RequestParam("latitude") Double latitude,
            @RequestParam("longitude") Double longitude,
            @RequestParam("severity") Integer severity) throws IOException {
        PotHoleDto created = this.potHoleService.createPotHole(file, latitude, longitude, severity);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PotHoleDto> updatePotHole(@RequestBody PotHoleDto potHoleDto, @PathVariable Long id) {
        return ResponseEntity.ok(this.potHoleService.updatePotHole(potHoleDto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePotHoleById(@PathVariable Long id) {
        this.potHoleService.deletePotHoleById(id);
        return ResponseEntity.ok("PotHole deleted successfully");
    }

    @PostMapping("/{id}/upvote")
    public ResponseEntity<PotHoleDto> upvote(@PathVariable Long id) {
        return ResponseEntity.ok(this.potHoleService.upvote(id));
    }

    @PostMapping("/{id}/downvote")
    public ResponseEntity<PotHoleDto> downvote(@PathVariable Long id) {
        return ResponseEntity.ok(this.potHoleService.downvote(id));
    }
}
