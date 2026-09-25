package com.marea.diarydbt.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    private SecretKey chiave() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generaToken(String utenteId, String ruolo) {
        Date ora = new Date();
        Date scadenza = new Date(ora.getTime() + expirationMs);
        return Jwts.builder()
                .subject(utenteId)
                .claim("ruolo", ruolo)
                .issuedAt(ora)
                .expiration(scadenza)
                .signWith(chiave())
                .compact();
    }

    public Claims estraiClaims(String token) {
        return Jwts.parser()
                .verifyWith(chiave())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean tokenValido(String token) {
        try {
            Claims claims = estraiClaims(token);
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public String idUtenteDaToken(String token) {
        return estraiClaims(token).getSubject();
    }

    public String ruoloDaToken(String token) {
        return estraiClaims(token).get("ruolo", String.class);
    }
}
