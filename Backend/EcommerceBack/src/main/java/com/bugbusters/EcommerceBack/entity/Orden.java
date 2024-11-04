package com.bugbusters.EcommerceBack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "orden")
public class Orden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "fecha_compra", columnDefinition = "DATE")
    private LocalDate fecha;
    private double total;
    private String provincia;
    private String ciudad;
    private String domicilio;
    private String telefono;

    //private Usuario usuario;
}
