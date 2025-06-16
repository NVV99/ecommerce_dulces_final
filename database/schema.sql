-- Table structure for table `categorias`
DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `categorias` VALUES (1,'bebidas','Productos de la categoría bebidas'),(2,'dulces','Productos de la categoría dulces'),(3,'chocolates','Productos de la categoría chocolates'),(4,'bizcochos','Productos de la categoría bizcochos');

-- Table structure for table `comentarios`
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

-- Table structure for table `direcciones_envio`
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
INSERT INTO `direcciones_envio` VALUES (1,2,'Calle Prueba 123','Madrid','28001','España'),(6,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(7,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(8,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(9,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(10,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(11,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(12,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(13,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(14,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(15,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(16,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(17,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(18,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(19,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(20,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(21,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(22,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(23,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(24,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(25,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(26,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(27,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(28,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(29,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(30,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(31,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(32,10,'Maria Moliner','Ejea de los caballeros','50600','España'),(33,16,'Maria Moliner','Ejea de los caballeros','50600','España'),(34,16,'Maria Moliner','Ejea de los caballeros','50600','España'),(35,16,'Maria Moliner','Ejea de los caballeros','50600','España'),(36,16,'Maria Moliner','Ejea de los caballeros','50600','España'),(37,16,'Maria Moliner','Ejea de los caballeros','50600','España'),(38,16,'Maria Moliner','Ejea de los caballeros','50600','España'),(39,16,'Maria Moliner','Ejea de los caballeros','50600','España'),(40,16,'Maria Moliner','Ejea de los caballeros','50600','España');

-- Table structure for table `favoritos`
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

-- Table structure for table `historial_stock`
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

-- Table structure for table `mensajes_contacto`
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
INSERT INTO `mensajes_contacto` VALUES (1,NULL,'Niki Valentinov Velichkov','nikivalentinov1999@gmail.com','sedfsfsdf','2025-06-15 00:46:48'),(2,NULL,'Niki Valentinov Velichkov','nikivalentinov1999@gmail.com','sedfsfsdf','2025-06-15 00:46:54'),(3,NULL,'Niki Valentinov Velichkov','nikivalentinov1999@gmail.com','hola jejeje','2025-06-15 03:15:18'),(4,NULL,'Niki','nikivalentinov1999@gmail.com','AZSCSSADF','2025-06-15 03:29:19'),(5,NULL,'Niki','nikivalentinov1999@gmail.com','axzx','2025-06-15 03:30:36'),(6,NULL,'Niki','nikivalentinov1999@gmail.com','Hola jsjssjsj','2025-06-15 03:49:47'),(7,NULL,'Niki','nikivalentinov1999@gmail.com','fsddfsdf','2025-06-15 04:03:39'),(8,NULL,'Niki','nikivalentinov1999@gmail.com','preuba1','2025-06-15 04:06:51'),(9,NULL,'Niki','nikivalentinov1999@gmail.com','zcxzxc','2025-06-15 04:07:23'),(10,NULL,'Niki','nikivalentinov1999@gmail.com','asdasd','2025-06-15 04:08:30'),(11,NULL,'Niki','nikivalentinov1999@gmail.com','sadfasd','2025-06-15 04:08:59'),(12,NULL,'Niki','nikivalentinov1999@gmail.com','Prueba de formulario.','2025-06-15 04:10:59'),(13,NULL,'Niki','nikivalentinov1999@gmail.com','fghfg','2025-06-16 07:20:46'),(14,NULL,'Niki','nikivalentinov1999@gmail.com','asd','2025-06-16 07:21:34'),(15,NULL,'Niki','nikivalentinov1999@gmail.com','SDFSDF','2025-06-16 07:24:49'),(16,NULL,'Niki','nikivalentinov1999@gmail.com','SDFSDF','2025-06-16 07:26:04'),(17,NULL,'Niki','nikivalentinov1999@gmail.com','SDFSDF','2025-06-16 07:26:05'),(18,NULL,'Niki','nikivalentinov1999@gmail.com','sss','2025-06-16 07:28:10'),(19,NULL,'Niki','nikivalentinov1999@gmail.com','hhh','2025-06-16 07:31:53'),(20,NULL,'Niki','nikivalentinov1999@gmail.com','dfgsdf','2025-06-16 07:32:24'),(21,NULL,'Niki','nikivalentinov1999@gmail.com','sdsd','2025-06-16 07:34:13'),(22,NULL,'Niki','nikivalentinov1999@gmail.com','sdsd','2025-06-16 07:35:07'),(23,NULL,'Nikisdsd','nikivalentinov1999@gmail.com','sdsd','2025-06-16 07:35:58'),(24,NULL,'Niki','nikivalentinov1999@gmail.com','sss','2025-06-16 07:36:32'),(25,NULL,'Niki','nikivalentinov1999@gmail.com','sdsad','2025-06-16 07:37:52'),(26,NULL,'Niki','nikivalentinov1999@gmail.com','sdsd','2025-06-16 07:38:21'),(27,NULL,'Niki','nikivalentinov1999@gmail.com','sdfsdf','2025-06-16 07:38:34'),(28,NULL,'Nikisdfs','nikivalentinov1999@gmail.com','sdfsdf','2025-06-16 07:53:06');

-- Table structure for table `metodos_pago`
DROP TABLE IF EXISTS `metodos_pago`;
CREATE TABLE `metodos_pago` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `metodos_pago` VALUES (1,'Tarjeta de crédito','Pago seguro con tarjeta'),(2,'PayPal','Paga cómodamente con tu cuenta PayPal'),(3,'Transferencia bancaria','Transferencia directa a nuestra cuenta');

-- Table structure for table `pedido_productos`
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
INSERT INTO `pedido_productos` VALUES (1,1,'Refresco Ramune uva (3 diseños Alea Sanrio)',1,3.50),(2,2,'Refresco Ramune uva (3 diseños Alea Sanrio)',1,3.50),(3,3,'Refresco Crystal Chanmery uva (Pokémon Edit)',4,3.20),(4,4,'Refresco Crystal Chanmery uva (Pokémon Edit)',4,3.20);

-- Table structure for table `pedidos`
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
INSERT INTO `pedidos` VALUES (1,NULL,'Niki Valentinov Velichkov','Maria Moliner','Ejea de los caballeros','50600','643374449',3.50,'2025-06-16 14:07:13','pagado'),(2,NULL,'Cliente','Dirección no disponible','Ciudad no disponible','00000','000000000',3.50,'2025-06-16 14:08:43','pagado'),(3,NULL,'Niki Valentinov Velichkov','Maria Moliner','Ejea de los caballeros','50600','643374449',12.80,'2025-06-16 14:24:52','pendiente'),(4,NULL,'Cliente','Dirección no disponible','Ciudad no disponible','00000','000000000',12.80,'2025-06-16 14:25:03','pendiente');

-- Table structure for table `productos`
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
INSERT INTO `productos` VALUES (1,'Bebida coreana uva roja Hello Kitty','Figura sorpresa Sanrio, 220 ml','https://via.placeholder.com/300x300?text=uva-roja',2.99,30,1,'2025-06-14 21:31:09'),(2,'Refresco Ramune uva (3 diseños Alea Sanrio)','Botella 330 ml, edición limitada','https://via.placeholder.com/300x300?text=ramune-uva',3.50,30,1,'2025-06-14 21:31:09'),(3,'Refresco Crystal Chanmery uva (Pokémon Edit)','Lata 360 ml, edición Pokémon','https://via.placeholder.
