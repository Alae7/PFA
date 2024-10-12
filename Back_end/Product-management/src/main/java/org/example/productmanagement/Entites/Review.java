package org.example.productmanagement.Entites;

import jakarta.persistence.*;
import lombok.*;
import org.example.productmanagement.Model.User;

import java.util.Date;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Setter
@Table(name = "REVIEW")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "ID_USER")
    private Long iduser;
    @Transient
    private User user;

    @Column(name = "ID_PRODUCT")
    private Long idProducts;
    @Transient
    private Product product;

    @Column(name = "DATE")
    private String date;

    @Column(name = "RATING")
    private int rating;

    @Column(name = "COMMENT")
    private String comment;
}
