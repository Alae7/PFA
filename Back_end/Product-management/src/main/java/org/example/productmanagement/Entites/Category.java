package org.example.productmanagement.Entites;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Setter
@Table(name = "CATEGORY")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "IMAGE")
    private String image;

    @Column(name = "IMAGE_Key")
    private String imageKey;

    @Column(name = "PUB")
    private String pub;
}
