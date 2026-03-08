package com.backend.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "potholes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PotHole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double latitude;
    @Column(nullable = false)
    private Double longitude;

    private String imageUrl;

    private Integer severity; // 1-3 most severe

    private Integer upvotes;
    private Integer downvotes;

}

