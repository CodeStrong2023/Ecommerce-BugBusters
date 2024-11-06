package com.bugbusters.EcommerceBack.service;


import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import com.mercadopago.resources.preference.PreferenceItem;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class MercadoPagoService {
    private String accessToken = "APP_USR-239783461842066-110522-af965c4f17f7dca56185d0e4b2a1ae20-2081149170";

    public String createPreference(List<Map<String, Object>> productos){
        MercadoPagoConfig.setAccessToken(accessToken);

        try{
            List<PreferenceItemRequest> items = new ArrayList<>();

            for (Map<String, Object> productoData : productos) {
                String nombre = (String) productoData.get("nombre");
                BigDecimal precio;
                Object precioObj = productoData.get("precio");

                if (precioObj instanceof Double) {
                    precio = BigDecimal.valueOf((Double) precioObj);
                } else if (precioObj instanceof Integer) {
                    precio = BigDecimal.valueOf((Integer) precioObj);
                } else {
                    throw new IllegalArgumentException("El precio debe ser un número válido");
                }
                int cantidad = ((Number) productoData.get("cantidad")).intValue();

                PreferenceItemRequest item = PreferenceItemRequest.builder()
                        .title(nombre)
                        .quantity(cantidad)
                        .unitPrice(precio)
                        .build();
                items.add(item);
            }

            PreferenceBackUrlsRequest backUrlsRequest = PreferenceBackUrlsRequest.builder()
                    .success("http://127.0.0.1:5500/Frontend/productos.html?pagoExitoso=true")
                    .pending("http://127.0.0.1:5500/Frontend/productos.html?pagoPendiente=true")
                    .failure("http://127.0.0.1:5500/Frontend/productos.html?pagoFallido=true")
                    .build();


            PreferenceRequest request = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backUrlsRequest)
                    .build();

            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(request);

            return preference.getInitPoint();

        }catch (MPApiException e) {
            System.err.println("Error al crear la preferencia: " + e.getMessage());
            System.err.println("Código de error: " + e.getStatusCode());
            System.err.println("Descripción: " + e.getApiResponse().getContent());
            System.err.println("Detalles adicionales: " + e.getApiResponse().getContent()); // Si está disponible
            return e.toString();
        } catch (MPException e) {
            System.err.println("Error general de Mercado Pago: " + e.getMessage());
            return e.toString();
        }
    }

}
