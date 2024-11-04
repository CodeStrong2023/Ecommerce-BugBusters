package com.bugbusters.EcommerceBack.entity;
import jakarta.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Set;

@Data //getters, setters y toString
@AllArgsConstructor //constructor con todos los parámetros
@NoArgsConstructor //constructor vacío

@Entity
@Table(name = "usuarios")
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //estrategia autoincrementable
    private Long id;
    
    @Column(unique = true, nullable = false) //unicidad por columna y valores no nulos
    private String usuario;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String rol = "ROLE_USER";

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Set.of((GrantedAuthority) () -> rol); // Devuelve un único GrantedAuthority
    }

    @Override
    public String getUsername() {
        return usuario; // Devuelve el nombre de usuario
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; 
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; 
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; 
    }

    @Override
    public boolean isEnabled() {
        return true; 
    }
}