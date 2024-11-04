package com.bugbusters.EcommerceBack.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.bugbusters.EcommerceBack.entity.Usuario;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

@Service
public class TokenService {
    private String apiSecret = "bugbusters";

    public String generarToken(Usuario usuario) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            return JWT.create()
                    .withIssuer("Clave de Sol")
                    .withSubject(usuario.getEmail())
                    .withClaim("Id", usuario.getId())
                    .withClaim("rol", usuario.getRol())
                    .withExpiresAt(generarFechaExpiracion())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error al crear el token: " + exception.getMessage());
        }
    }

    public String getSubject(String token) {
        if (token == null || token.trim().isEmpty()) {
            throw new RuntimeException("Token no puede ser nulo o vacío");
        }

        String subject;
        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("Clave de Sol")
                    .build();
            DecodedJWT jwt = verifier.verify(token);
            subject = jwt.getSubject();
        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Token inválido: " + exception.getMessage());
        }

        if (subject == null) {
            throw new RuntimeException("El sujeto del token es nulo");
        }
        return subject;
    }

    private Instant generarFechaExpiracion() {
        return ZonedDateTime.now(ZoneOffset.of("-03:00")).plusHours(2).toInstant();
    }
}


