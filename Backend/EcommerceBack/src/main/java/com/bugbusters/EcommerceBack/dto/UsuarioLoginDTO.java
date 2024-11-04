package com.bugbusters.EcommerceBack.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UsuarioLoginDTO(
        @NotBlank(message = "Debes ingresar un correo válido para iniciar sesión.")
        @Email(message = "El formato del correo no es válido.")
        String email,

        @NotBlank(message = "Debes ingresar una contraseña.")
        @Pattern(regexp = "^[\\w\\W]{6,9}$", message = "La contraseña tiene que tener entre 6 y 9 caractres.")
        String password
) {
}
