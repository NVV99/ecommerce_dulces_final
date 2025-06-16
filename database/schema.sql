-- Elimina tablas en orden inverso a dependencias (para evitar errores de FK)
DROP TABLE IF EXISTS pedido_productos;
DROP TABLE IF EXISTS comentarios;
DROP TABLE IF EXISTS favoritos;
DROP TABLE IF EXISTS direcciones_envio;
DROP TABLE IF EXISTS historial_stock;
DROP TABLE IF EXISTS mensajes_contacto;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS metodos_pago;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;

-- Tabla: USUARIOS
CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) DEFAULT NULL,
  contraseña VARCHAR(255) NOT NULL,
  tipo ENUM('cliente','admin') DEFAULT 'cliente',
  fecha_registro TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY (email)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

INSERT INTO usuarios VALUES
(1,'Admin','admin@dulces.com','666666666','admin123','admin','2025-06-14 21:31:09'),
(2,'Cliente de prueba','cliente@dulces.com','666111111','cliente123','cliente','2025-06-14 21:31:09'),
(3,'hola','nikivalentinov1999@gmail.com','','$2b$10$pYpiGIU4feftIoIdDcwz/unAT2AlPJUD1GicTWX1c0MZouQ/hFCr2','cliente','2025-06-14 21:31:30'),
(4,'hola','partizannvv@gmail.com',NULL,'$2b$10$ooIXpQiVGVgwhlB4h7XQxuHlxieq32utm4mZsP2M/f4Rn7PI4T5k6','cliente','2025-06-15 23:47:48'),
(5,'hola','holahola@gmail.com',NULL,'$2b$10$kqQiX5aHiJfFuVkWzXArd.RXW8ahD8r9Nnoq7HL70vD/kqVp7BhOu','cliente','2025-06-15 23:50:47'),
(6,'bro1','usuario123@prueba.com',NULL,'$2b$10$OZEQdcwwq1BauD.euAg9uehDQ0Xz9XLn2Q/OBSEkRD8uAMM.XMosm','cliente','2025-06-15 23:52:14'),
(7,'meuuu','correoprueba@prueba.com',NULL,'$2b$10$RxmJM4ybg/luwuYAdvf71.X0TH3w0XUbEV9tzIzBazYBAk1apTCwG','cliente','2025-06-15 23:54:03'),
(8,'Maldit','maldit@gmial.com',NULL,'$2b$10$KCJVvG/Wd0iPFIe7TaAmsuwVG8zMNdYPqnBasiJr2bLFUTsQcRlZS','cliente','2025-06-15 23:55:42'),
(9,'nuevo1','nuevo123@gmail.com',NULL,'$2b$10$un5YTUKGyU0eFgf7himU3Oj..4CtemLdIOCZi1jkHMysndxTnopqm','cliente','2025-06-16 00:01:32'),
(10,'PruebaX','pruebaX@example.com',NULL,'$2b$10$TGbP3J8qyzNVh6XfdSt3C.Yp02NE4jR7tRruDi4Z9lnxEON5UFCd2','cliente','2025-06-16 00:10:17'),
(11,'amazin','amazin@amazin.com',NULL,'$2b$10$nPhK9mzufxl4bSbBUKqIGuEJNtwuM/VKo1RdZ5XeaDp7INGrls8b.','cliente','2025-06-16 00:14:12'),
(15,'admin','admin@sakura.com',NULL,'$2b$10$10GG.RD7gcsA8wIfNhh2XOJyPDp0OMdlKv8ztcy6fOc/6Vv7xD6.a','admin','2025-06-16 09:40:11'),
(16,'prueba','prueba@ejemplo.com',NULL,'$2b$10$.O8NAn8D3TaEz07s/.6XROD7EtBlC40AOL33VjZz4hp8F4EXIdXXa','cliente','2025-06-16 11:11:09');

-- Tabla: CATEGORIAS
CREATE TABLE categorias (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
INSERT INTO categorias VALUES
(1,'bebidas','Productos de la categoría bebidas'),
(2,'dulces','Productos de la categoría dulces'),
(3,'chocolates','Productos de la categoría chocolates'),
(4,'bizcochos','Productos de la categoría bizcochos');

-- Tabla: METODOS_PAGO
CREATE TABLE metodos_pago (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
INSERT INTO metodos_pago VALUES
(1,'Tarjeta de crédito','Pago seguro con tarjeta'),
(2,'PayPal','Paga cómodamente con tu cuenta PayPal'),
(3,'Transferencia bancaria','Transferencia directa a nuestra cuenta');

-- Tabla: PEDIDOS
CREATE TABLE pedidos (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT DEFAULT NULL,
  nombre_completo VARCHAR(255) DEFAULT NULL,
  direccion VARCHAR(255) DEFAULT NULL,
  ciudad VARCHAR(100) DEFAULT NULL,
  cp VARCHAR(20) DEFAULT NULL,
  telefono VARCHAR(50) DEFAULT NULL,
  total DECIMAL(10,2) DEFAULT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(20) DEFAULT 'pendiente',
  PRIMARY KEY (id),
  KEY (usuario_id),
  CONSTRAINT pedidos_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
INSERT INTO pedidos VALUES
(1,NULL,'Niki Valentinov Velichkov','Maria Moliner','Ejea de los caballeros','50600','643374449',3.50,'2025-06-16 14:07:13','pagado'),
(2,NULL,'Cliente','Dirección no disponible','Ciudad no disponible','00000','000000000',3.50,'2025-06-16 14:08:43','pagado'),
(3,NULL,'Niki Valentinov Velichkov','Maria Moliner','Ejea de los caballeros','50600','643374449',12.80,'2025-06-16 14:24:52','pendiente'),
(4,NULL,'Cliente','Dirección no disponible','Ciudad no disponible','00000','000000000',12.80,'2025-06-16 14:25:03','pendiente');

-- Tabla: PRODUCTOS
CREATE TABLE productos (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  imagen VARCHAR(255) DEFAULT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  categoria_id INT DEFAULT NULL,
  fecha_creacion TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY (categoria_id),
  CONSTRAINT productos_ibfk_1 FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;
-- Agrega aquí todos tus INSERT INTO productos (pueden ser muchos, pega todos los que tengas aquí)

-- Tabla: COMENTARIOS
CREATE TABLE comentarios (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  producto_id INT NOT NULL,
  texto TEXT,
  rating TINYINT DEFAULT NULL,
  fecha TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY (usuario_id),
  KEY (producto_id),
  CONSTRAINT comentarios_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  CONSTRAINT comentarios_ibfk_2 FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
  CONSTRAINT comentarios_chk_1 CHECK ((rating BETWEEN 1 AND 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: DIRECCIONES_ENVIO
CREATE TABLE direcciones_envio (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  calle VARCHAR(255) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  codigo_postal VARCHAR(20) NOT NULL,
  pais VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  KEY (usuario_id),
  CONSTRAINT direcciones_envio_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4;
-- Agrega aquí tus INSERT INTO direcciones_envio (todas las que tengas)

-- Tabla: FAVORITOS
CREATE TABLE favoritos (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  producto_id INT NOT NULL,
  PRIMARY KEY (id),
  KEY (usuario_id),
  KEY (producto_id),
  CONSTRAINT favoritos_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  CONSTRAINT favoritos_ibfk_2 FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: HISTORIAL_STOCK
CREATE TABLE historial_stock (
  id INT NOT NULL AUTO_INCREMENT,
  producto_id INT NOT NULL,
  cambio_stock INT NOT NULL,
  motivo TEXT NOT NULL,
  fecha TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY (producto_id),
  CONSTRAINT historial_stock_ibfk_1 FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: MENSAJES_CONTACTO
CREATE TABLE mensajes_contacto (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT DEFAULT NULL,
  nombre VARCHAR(100) DEFAULT NULL,
  email VARCHAR(100) DEFAULT NULL,
  mensaje TEXT NOT NULL,
  fecha TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY (usuario_id),
  CONSTRAINT mensajes_contacto_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;
-- Agrega aquí tus INSERT INTO mensajes_contacto (todas las que tengas)

-- Tabla: PEDIDO_PRODUCTOS
CREATE TABLE pedido_productos (
  id INT NOT NULL AUTO_INCREMENT,
  pedido_id INT DEFAULT NULL,
  nombre_producto VARCHAR(255) DEFAULT NULL,
  cantidad INT DEFAULT NULL,
  precio_unitario DECIMAL(10,2) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY (pedido_id),
  CONSTRAINT pedido_productos_ibfk_1 FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
INSERT INTO `productos` VALUES (1,'Bebida coreana uva roja Hello Kitty','Figura sorpresa Sanrio, 220 ml','https://via.placeholder.com/300x300?text=uva-roja',2.99,30,1,'2025-06-14 21:31:09'),(2,'Refresco Ramune uva (3 diseños Alea Sanrio)','Botella 330 ml, edición limitada','https://via.placeholder.com/300x300?text=ramune-uva',3.50,30,1,'2025-06-14 21:31:09'),(3,'Refresco Crystal Chanmery uva (Pokémon Edit)','Lata 360 ml, edición Pokémon','https://via.placeholder.
