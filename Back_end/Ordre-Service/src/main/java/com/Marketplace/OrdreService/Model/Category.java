package com.Marketplace.OrdreService.Model;

import jakarta.persistence.*;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Setter

public class Category {
    private Long id;
    private String name;
    private String image;
    private String pub;
}
