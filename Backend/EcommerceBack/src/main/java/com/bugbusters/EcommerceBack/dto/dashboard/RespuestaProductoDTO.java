package com.bugbusters.EcommerceBack.dto.dashboard;
public record RespuestaProductoDTO(
        Long id,
        String nombre,
        String descripcion,
        Double precio,
        String imagenUrl,
        CategoriaDTO categoria) {
}
