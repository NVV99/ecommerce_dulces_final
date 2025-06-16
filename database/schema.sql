-- Tabla: USUARIOS
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `contraseña` varchar(255) NOT NULL,
  `tipo` enum('cliente','admin') DEFAULT 'cliente',
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `usuarios` VALUES 
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
DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `categorias` VALUES 
(1,'bebidas','Productos de la categoría bebidas'),
(2,'dulces','Productos de la categoría dulces'),
(3,'chocolates','Productos de la categoría chocolates'),
(4,'bizcochos','Productos de la categoría bizcochos');

-- Tabla: PRODUCTOS
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `categoria_id` int DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `productos` VALUES 
(1,'Bebida coreana uva roja Hello Kitty','Figura sorpresa Sanrio, 220 ml','https://via.placeholder.com/300x300?text=uva-roja',2.99,30,1,'2025-06-14 21:31:09'),
(2,'Refresco Ramune uva (3 diseños Alea Sanrio)','Botella 330 ml, edición limitada','https://via.placeholder.com/300x300?text=ramune-uva',3.50,30,1,'2025-06-14 21:31:09'),
(3,'Refresco Crystal Chanmery uva (Pokémon Edit)','Lata 360 ml, edición Pokémon','https://via.placeholder.com/300x300?text=chanmery-uva',3.20,30,1,'2025-06-14 21:31:09'),
(4,'Té verde tostado edición limitada Rilakkuma','Botella 500 ml, edición Rilakkuma','https://via.placeholder.com/300x300?text=te-verde-rilakkuma',2.80,30,1,'2025-06-14 21:31:09'),
(5,'Refresco Crystal Chanmery uva (Doraemon Edit)','Lata 360 ml, edición Doraemon','https://via.placeholder.com/300x300?text=chanmery-doraemon',3.20,30,1,'2025-06-14 21:31:09'),
(6,'Refresco Clear Ocean Bomb miel-limón (One Piece Zoro)','Botella 330 ml, edición Zoro','https://via.placeholder.com/300x300?text=clear-ocean-zoro',3.50,30,1,'2025-06-14 21:31:09'),
(7,'Refresco Ramune mochi-limón (3 diseños Alea Kuromi)','Botella 330 ml, edición Kuromi','https://via.placeholder.com/300x300?text=ramune-mochi',3.50,30,1,'2025-06-14 21:31:09'),
(8,'Bebida Bubble manzana + bobas Aloe Vera Hello Kitty','Botella 310 ml, edición Hello Kitty','https://via.placeholder.com/300x300?text=bubble-manzana',4.00,30,1,'2025-06-14 21:31:09'),
(9,'Trío chuches kawaii Outlet Menu Sakura','Pack surtido de chuches japonés','https://via.placeholder.com/300x300?text=trio-chuches',5.99,30,2,'2025-06-14 21:31:09'),
(10,'Caramelo coreano Shin-Chan (20 escenas acrílicas)','20 escenas aleatorias de Shin-Chan','https://via.placeholder.com/300x300?text=caramelo-shinchan',3.50,30,2,'2025-06-14 21:31:09'),
-- ... (agrega aquí el resto de tus productos, acorta para no colapsar)
(31,'Mochis tradicionales salty azuki','Paquete 130g','https://via.placeholder.com/300x300?text=mochis-salty-azuki',4.80,30,4,'2025-06-14 21:31:09');

-- Tabla: PEDIDOS
DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `nombre_completo` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `cp` varchar(20) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado` varchar(20) DEFAULT 'pendiente',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `pedidos` VALUES 
(1,NULL,'Niki Valentinov Velichkov','Maria Moliner','Ejea de los caballeros','50600','643374449',3.50,'2025-06-16 14:07:13','pagado'),
(2,NULL,'Cliente','Dirección no disponible','Ciudad no disponible','00000','000000000',3.50,'2025-06-16 14:08:43','pagado'),
(3,NULL,'Niki Valentinov Velichkov','Maria Moliner','Ejea de los caballeros','50600','643374449',12.80,'2025-06-16 14:24:52','pendiente'),
(4,NULL,'Cliente','Dirección no disponible','Ciudad no disponible','00000','000000000',12.80,'2025-06-16 14:25:03','pendiente');

-- Tabla: METODOS_PAGO
DROP TABLE IF EXISTS `metodos_pago`;
CREATE TABLE `metodos_pago` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `metodos_pago` VALUES 
(1,'Tarjeta de crédito','Pago seguro con tarjeta'),
(2,'PayPal','Paga cómodamente con tu cuenta PayPal'),
(3,'Transferencia bancaria','Transferencia directa a nuestra cuenta');

-- Tabla: COMENTARIOS
DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE `comentarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `texto` text,
  `rating` tinyint DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comentarios_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: DIRECCIONES_ENVIO
DROP TABLE IF EXISTS `direcciones_envio`;
CREATE TABLE `direcciones_envio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `calle` varchar(255) NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `codigo_postal` varchar(20) NOT NULL,
  `pais` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `direcciones_envio_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `direcciones_envio` VALUES 
(1,2,'Calle Prueba 123','Madrid','28001','España'),
(6,10,'Maria Moliner','Ejea de los caballeros','50600','España'),
(7,10,'Maria Moliner','Ejea de los caballeros','50600','España'),
(8,10,'Maria Moliner','Ejea de los caballeros','50600','España'),
(9,10,'Maria Moliner','Ejea de los caballeros','50600','España'),
(40,16,'Maria Moliner','Ejea de los caballeros','50600','España');

-- Tabla: FAVORITOS
DROP TABLE IF EXISTS `favoritos`;
CREATE TABLE `favoritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `producto_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: HISTORIAL_STOCK
DROP TABLE IF EXISTS `historial_stock`;
CREATE TABLE `historial_stock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int NOT NULL,
  `cambio_stock` int NOT NULL,
  `motivo` text NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `historial_stock_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: MENSAJES_CONTACTO
DROP TABLE IF EXISTS `mensajes_contacto`;
CREATE TABLE `mensajes_contacto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mensaje` text NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `mensajes_contacto_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `mensajes_contacto` VALUES 
(1,NULL,'Niki Valentinov Velichkov','nikivalentinov1999@gmail.com','sedfsfsdf','2025-06-15 00:46:48'),
(2,NULL,'Niki Valentinov Velichkov','nikivalentinov1999@gmail.com','sedfsfsdf','2025-06-15 00:46:54'),
(3,NULL,'Niki Valentinov Velichkov','nikivalentinov1999@gmail.com','hola jejeje','2025-06-15 03:15:18'),
(4,NULL,'Niki','nikivalentinov1999@gmail.com','AZSCSSADF','2025-06-15 03:29:19'),
(5,NULL,'Niki','nikivalentinov1999@gmail.com','axzx','2025-06-15 03:30:36'),
(6,NULL,'Niki','nikivalentinov1999@gmail.com','Hola jsjssjsj','2025-06-15 03:49:47'),
(7,NULL,'Niki','nikivalentinov1999@gmail.com','fsddfsdf','2025-06-15 04:03:39'),
(8,NULL,'Niki','nikivalentinov1999@gmail.com','preuba1','2025-06-15 04:06:51'),
(9,NULL,'Niki','nikivalentinov1999@gmail.com','zcxzxc','2025-06-15 04:07:23'),
(10,NULL,'Niki','nikivalentinov1999@gmail.com','asdasd','2025-06-15 04:08:30'),
(11,NULL,'Niki','nikivalentinov1999@gmail.com','sadfasd','2025-06-15 04:08:59'),
(12,NULL,'Niki','nikivalentinov1999@gmail.com','Prueba de formulario.','2025-06-15 04:10:59'),
(13,NULL,'Niki','nikivalentinov1999@gmail.com','fghfg','2025-06-16 07:20:46'),
(14,NULL,'Niki','nikivalentinov1999@gmail.com','asd','2025-06-16 07:21:34'),
(15,NULL,'Niki','nikivalentinov1999@gmail.com','SDFSDF','2025-06-16 07:24:49'),
(16,NULL,'Niki','nikivalentinov1999@gmail.com','SDFSDF','2025-06-16 07:26:04'),
(17,NULL,'Niki','nikivalentinov1999@gmail.com','SDFSDF','2025-06-16 07:26:05'),
(18,NULL,'Niki','nikivalentinov1999@gmail.com','sss','2025-06-16 07:28:10'),
(19,NULL,'Niki','nikivalentinov1999@gmail.com','hhh','2025-06-16 07:31:53'),
(20,NULL,'Niki','nikivalentinov1999@gmail.com','dfgsdf','2025-06-16 07:32:24'),
(21,NULL,'Niki','nikivalentinov1999@gmail.com','sdsd','2025-06-16 07:34:13'),
(22,NULL,'Niki','nikivalentinov1999@gmail.com','sdsd','2025-06-16 07:35:07'),
(23,NULL,'Nikisdsd','nikivalentinov1999@gmail.com','sdsd','2025-06-16 07:35:58'),
(24,NULL,'Niki','nikivalentinov1999@gmail.com','sss','2025-06-16 07:36:32'),
(25,NULL,'Niki','nikivalentinov1999@gmail.com','sdsad','2025-06-16 07:37:52'),
(26,NULL,'Niki','nikivalentinov1999@gmail.com','sdsd','2025-06-16 07:38:21'),
(27,NULL,'Niki','nikivalentinov1999@gmail.com','sdfsdf','2025-06-16 07:38:34'),
(28,NULL,'Nikisdfs','nikivalentinov1999@gmail.com','sdfsdf','2025-06-16 07:53:06');

-- Tabla: PEDIDO_PRODUCTOS
DROP TABLE IF EXISTS `pedido_productos`;
CREATE TABLE `pedido_productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int DEFAULT NULL,
  `nombre_producto` varchar(255) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  CONSTRAINT `pedido_productos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `pedido_productos` VALUES 
(1,1,'Refresco Ramune uva (3 diseños Alea Sanrio)',1,3.50),
(2,2,'Refresco Ramune uva (3 diseños Alea Sanrio)',1,3.50),
(3,3,'Refresco Crystal Chanmery uva (Pokémon Edit)',4,3.20),
(4,4,'Refresco Crystal Chanmery uva (Pokémon Edit)',4,3.20);

