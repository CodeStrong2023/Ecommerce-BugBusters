package com.bugbusters.EcommerceBack.service;


import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import lombok.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class MercadoPagoService {

    //private String accessToken = "APP_USR-3172926259051065-110213-4b0ce9922c3896a6fac5ff3a8013dc94-1988058834";

    @Value("${MP_ACCESS_TOKEN}")
    private String accessToken;


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
                    .success("https://ecommerce-bug-busters.vercel.app/productos.html?pagoExitoso=true")
                    .pending("https://ecommerce-bug-busters.vercel.app/productos.html?pagoPendiente=true")
                    .failure("https://ecommerce-bug-busters.vercel.app/productos.html?pagoFallido=true")
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
