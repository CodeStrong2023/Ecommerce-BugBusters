package com.bugbusters.EcommerceBack.dto.dashboard;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.web.multipart.MultipartFile;

public record CrearProductoDTO(
        @NotBlank(message = "Debes incluir un nombre para el producto")
        String nombre,
        @NotBlank(message = "Debes incluir una descripción para el producto")
        String descripcion,
        @NotNull(message = "Debes incluir un precio para el producto")
        @Positive(message = "El precio no puede ser negativo o cero")
        Double precio,
        @NotNull(message = "Debes incluir un imagen para el producto")
        MultipartFile imagen,
        @NotNull(message = "Debes asignarle una categoria al producto")
        CategoriaDTO categoria
) {
}
