package com.bugbusters.EcommerceBack.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Esto permite acceder a imágenes en public/imagenes del backend
        registry.addResourceHandler("/imagenes/**")
                .addResourceLocations("classpath:/public/imagenes/", "file:imagenes/");

    }
}
