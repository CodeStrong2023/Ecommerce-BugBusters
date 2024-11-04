CREATE TABLE producto
(
    id           SERIAL PRIMARY KEY,
    nombre       varchar(300)   NOT NULL,
    descripcion  TEXT           NOT NULL,
    precio       NUMERIC(10, 2) NOT NULL,
    imagen_url   VARCHAR(500),
    categoria_id BIGINT,
    FOREIGN KEY (categoria_id) REFERENCES categoria (id)
)