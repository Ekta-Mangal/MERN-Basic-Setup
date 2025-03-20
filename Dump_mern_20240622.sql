-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: base_mern
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `upload_data`
--

DROP TABLE IF EXISTS `upload_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `state` varchar(45) DEFAULT NULL,
  `pincode` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upload_data`
--

LOCK TABLES `upload_data` WRITE;
/*!40000 ALTER TABLE `upload_data` DISABLE KEYS */;
INSERT INTO `upload_data` VALUES (1,'Delhi','110032','2024-06-21 10:09:19','2024-06-21 10:09:19'),(2,'Noida','201014','2024-06-21 10:09:19','2024-06-21 10:09:19'),(3,'a','201015','2024-06-21 10:09:19','2024-06-21 10:09:19'),(4,'b','201016','2024-06-21 10:09:19','2024-06-21 10:09:19'),(5,'c','201017','2024-06-21 10:09:19','2024-06-21 10:09:19'),(6,'d','201018','2024-06-21 10:09:19','2024-06-21 10:09:19'),(7,'e','201019','2024-06-21 10:09:19','2024-06-21 10:09:19'),(8,'f','201020','2024-06-21 10:09:19','2024-06-21 10:09:19'),(9,'g','201021','2024-06-21 10:09:19','2024-06-21 10:09:19'),(10,'h','201022','2024-06-21 10:09:19','2024-06-21 10:09:19'),(11,'i','201023','2024-06-21 10:09:19','2024-06-21 10:09:19');
/*!40000 ALTER TABLE `upload_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `state` varchar(45) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'ekta','ekta@gmail.com','Delhi','$2a$10$OI2n/vmOKNc/8qUgqaygTe/rsCKxIyRj/9bolk5EHYO90YAsaEB2W','2024-06-18 06:49:29','2024-06-19 05:40:31'),(5,'riya','riya@gmail.com','Noida','$2a$10$XafV7ZpfVX9MIwR0JpWy5.uRZLuWpqMK84SaOnD4D7leml6hjpGEy','2024-06-18 07:12:55','2024-06-19 05:40:19'),(19,'piya','piya@gmail.com','Delhi','$2a$10$C8uuQ5Yogv2mvl4YvUifjesENkXss11uxvqbGSBTsRoASv49YuQj.','2024-06-19 05:23:46','2024-06-19 05:31:15'),(20,'excvxcvkta','ekta2@gmail.com','Noida','$2a$10$1mQxqcybbMXnRHda7mJ7K.TjAqFR62ttKbqegFjkOj4OZ1qFUGSRO','2024-06-19 07:51:16','2024-06-19 07:51:16');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'base_mern'
--

--
-- Dumping routines for database 'base_mern'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-22 13:23:57
