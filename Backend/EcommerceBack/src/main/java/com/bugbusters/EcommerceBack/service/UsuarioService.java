package com.bugbusters.EcommerceBack.service;

import com.bugbusters.EcommerceBack.dto.UsuarioRegistroDTO;
import com.bugbusters.EcommerceBack.entity.Usuario;
import com.bugbusters.EcommerceBack.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService{

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //Registro de usuarios
    public Usuario registrarUsuario(UsuarioRegistroDTO usuarioRegistroDTO) {
        if (usuarioRepository.existsByUsuario(usuarioRegistroDTO.getUsuario()) ||
            usuarioRepository.existsByEmail(usuarioRegistroDTO.getEmail())) {
            throw new RuntimeException("El usuario o email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setUsuario(usuarioRegistroDTO.getUsuario());
        usuario.setEmail(usuarioRegistroDTO.getEmail());
        usuario.setPassword(passwordEncoder.encode(usuarioRegistroDTO.getPassword()));
        usuario.setRol("ROLE_USER");

        return usuarioRepository.save(usuario); //se guarda al usuario
    }

    //Inicio de sesión o login
    public Usuario obtenerUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Busca al usuario por su email
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (!usuarioOpt.isPresent()) { //método para verificar si el Optional contiene un valor
            throw new UsernameNotFoundException("Usuario no encontrado con el email: " + email);
        }

        Usuario usuarioEntidad = usuarioOpt.get();
        
        // Retorna al usuario convertido en UserDetails
        return new org.springframework.security.core.userdetails.User( //autenticación con Spring Security
                usuarioEntidad.getEmail(),
                usuarioEntidad.getPassword(),
                true, true, true, true, 
                usuarioEntidad.getAuthorities() //roles asociados con el usuario
        );
    }
}
