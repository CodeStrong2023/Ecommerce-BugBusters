package com.bugbusters.EcommerceBack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "orden_item")
public class OrdenItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int cantidad;
    private double precio;

    @ManyToOne(targetEntity = Producto.class)
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @ManyToOne(targetEntity = Orden.class)
    @JoinColumn(name = "id_orden", nullable = false)
    private Orden orden;
}
