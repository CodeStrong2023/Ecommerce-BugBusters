package com.bugbusters.EcommerceBack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false)
    private Double precio;

    @Column(name = "imagen_url", nullable = false)
    private String imagenUrl;

    @ManyToOne(
            targetEntity = Categoria.class
    )
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
}
