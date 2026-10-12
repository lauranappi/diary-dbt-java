package com.marea.notifiche;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IscrizionePushRepository extends JpaRepository<IscrizionePush, String> {
    Optional<IscrizionePush> findByEndpoint(String endpoint);
    List<IscrizionePush> findByAttivoTrue();
    void deleteByEndpointAndUtenteId(String endpoint, String utenteId);
}
