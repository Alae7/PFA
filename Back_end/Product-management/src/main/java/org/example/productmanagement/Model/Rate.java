package org.example.productmanagement.Model;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Setter
public class Rate {
    private double rating;
    private int nbReview;
}
