package com.backend.backend.repository;

import com.backend.backend.model.PotHole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PotHoleRepository extends JpaRepository<PotHole, Long> {
}
