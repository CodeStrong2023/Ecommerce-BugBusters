CREATE TABLE usuarios (
                          id BIGSERIAL PRIMARY KEY,
                          usuario VARCHAR(255) NOT NULL UNIQUE,
                          email VARCHAR(255) NOT NULL UNIQUE,
                          password VARCHAR(255) NOT NULL,
                          rol VARCHAR(255) NOT NULL
);