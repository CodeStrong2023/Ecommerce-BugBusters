package com.bugbusters.EcommerceBack.repository.dashboard;

import com.bugbusters.EcommerceBack.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoriaRepository extends JpaRepository<Categoria, Long> {
    Categoria findByNombre(String categoriaNombre);
}
