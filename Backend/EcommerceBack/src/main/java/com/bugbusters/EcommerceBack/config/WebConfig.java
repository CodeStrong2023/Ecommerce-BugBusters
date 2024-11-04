package com.bugbusters.EcommerceBack.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**") // Permite todas las rutas
//                        .allowedOrigins("http://127.0.0.1:5500", "http://localhost:5500")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//            }
//        };
//    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Esto permite acceder a imágenes en public/imagenes del backend
        registry.addResourceHandler("/imagenes/**")
                .addResourceLocations("classpath:/public/imagenes/", "file:imagenes/");

    }
}
