package com.marea.config;

import com.marea.service.ImportatoreSupabase;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.nio.file.Path;

// Si avvia solo con il profilo "importa-supabase":
//   java -jar marea.jar --spring.profiles.active=prod,importa-supabase --importa.file=esportazione.json
@Component
@Profile("importa-supabase")
@RequiredArgsConstructor
public class ImportaSupabaseRunner implements ApplicationRunner {

    private final ImportatoreSupabase importatore;
    private final ObjectMapper mapper;

    @Value("${importa.file:}")
    private String file;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (file.isBlank()) {
            throw new IllegalStateException("Indica il file con --importa.file=percorso/esportazione.json");
        }
        var radice = mapper.readTree(Path.of(file).toFile());
        if (radice.isArray() && !radice.isEmpty()) radice = radice.get(0);
        if (radice.has("esportazione")) radice = radice.get("esportazione");
        importatore.importa(radice);
    }
}
