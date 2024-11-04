package com.bugbusters.EcommerceBack.controller;

import com.bugbusters.EcommerceBack.service.MercadoPagoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class MercadoPagoController {
    private final MercadoPagoService mpService;

    public MercadoPagoController(MercadoPagoService mpService) {
        this.mpService = mpService;
    }

    @PostMapping("/create_preference")
    public String createPreference(@RequestBody List<Map<String, Object>> productos) {
        try {
            return mpService.createPreference(productos);
        } catch (Exception e) {
            return "Error al crear la preferencia: " + e.getMessage();
        }
    }
}
