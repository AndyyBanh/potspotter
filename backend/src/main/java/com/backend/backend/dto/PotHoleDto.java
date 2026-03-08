package com.backend.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PotHoleDto {
    private Long id;
    private Double latitude;
    private Double longitude;
    private String imageUrl;
    private Integer severity;
    private Integer upvotes;
    private Integer downvotes;

}
