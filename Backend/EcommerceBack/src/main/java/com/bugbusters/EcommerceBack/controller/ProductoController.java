package com.bugbusters.EcommerceBack.controller;

import com.bugbusters.EcommerceBack.dto.dashboard.ActualizarProductoDTO;
import com.bugbusters.EcommerceBack.dto.dashboard.CrearProductoDTO;
import com.bugbusters.EcommerceBack.dto.dashboard.RespuestaProductoDTO;
import com.bugbusters.EcommerceBack.entity.Producto;
import com.bugbusters.EcommerceBack.service.ProductoService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }


    //Controladores para el crud del admin

    @GetMapping("/admin")
//    @PreAuthorize("isAuthenticated() and hasRole('ADMIN')")
    public ResponseEntity<List<RespuestaProductoDTO>> listarProductosAdmin() {
        List<RespuestaProductoDTO> productos = productoService.getProductos();
        return ResponseEntity.ok(productos);
    }

    @PostMapping("/admin")
//    @PreAuthorize("isAuthenticated() and hasRole('ADMIN')")
    @Transactional
    public ResponseEntity crearProducto(@ModelAttribute @Valid CrearProductoDTO productoDTO){
        RespuestaProductoDTO producto = productoService.saveProducto(productoDTO);
        return ResponseEntity.ok().body(producto);
    }


    @PutMapping("/admin")
//    @PreAuthorize("isAuthenticated() and hasRole('ADMIN')")
    @Transactional
    public ResponseEntity modificarProducto(@Valid ActualizarProductoDTO productoDTO){
        RespuestaProductoDTO productoActualizado = productoService.updateProducto(productoDTO);
        return ResponseEntity.ok().body(productoActualizado);
    }


    @DeleteMapping("/admin/{id}")
//    @PreAuthorize("isAuthenticated() and hasRole('ADMIN')")
    @Transactional
    public ResponseEntity eliminarProducto(@PathVariable Long id){
        productoService.deleteProducto(id);
        return ResponseEntity.noContent().build();

    }



    //Controladores para la página productos

    @GetMapping("/productos")
    public ResponseEntity<List<RespuestaProductoDTO>> listarProductos() {
        List<RespuestaProductoDTO> productos = productoService.getProductos();
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/productos/{categoria}")
    public ResponseEntity<List<Producto>> obtenerProductosPorCategoria(@PathVariable String categoria) {
        List<Producto> productos = productoService.obtenerProductosPorCategoria(categoria);
        return ResponseEntity.ok(productos);
    }

}
