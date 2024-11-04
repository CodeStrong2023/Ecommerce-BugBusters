package com.bugbusters.EcommerceBack.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioRegistroDTO {
    @NotBlank(message = "El nombre de usuario es obligatorio.")
    private String usuario;

    @NotBlank(message = "Debes ingresar un correo válido para registrate.")
    @Email(message = "El formato del correo no es válido.")
    private String email;

    @NotBlank(message = "Debes ingresar una contraseña.")
    @Pattern(regexp = "^[\\w\\W]{6,9}$", message = "La contraseña tiene que tener entre 6 y 9 caractres.")
    private String password;
}