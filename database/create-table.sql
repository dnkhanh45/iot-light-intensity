CREATE DATABASE  IF NOT EXISTS `iot` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `iot`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: ecodb
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `bike`
--

DROP TABLE IF EXISTS `light`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `light` (
  `time` TIMESTAMP NOT NULL,
  `intensity` float NOT NULL
--   `bike_name` varchar(255) NOT NULL,
--   `pin` float DEFAULT NULL,
--   `status` tinyint(1) NOT NULL,
--   `category_id` int NOT NULL,
--   `station_id` int NOT NULL,
--   `image_path` varchar(55) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bike`
--

-- LOCK TABLES `bike` WRITE;
-- /*!40000 ALTER TABLE `bike` DISABLE KEYS */;
-- INSERT INTO `bike` VALUES (1,'xe đạp mini thống nhất',NULL,1,2,2,'xe1.jpg'),(2,'xe đạp đôi g3c yamaha',NULL,1,3,1,'xe2.jpg'),(3,'xe đạp điện suzuki',80,1,4,2,'xe3.jpg'),(4,'xe đạp hitasa',NULL,1,2,1,'xe4.jpg'),(5,'xe đạp điện đôi honda',90,1,5,2,'xe5.jpg'),(6,'xe đạp đôi honda',NULL,1,3,1,'xe6.jpg'),(7,'xe đạp mini nhật maruishi',NULL,1,2,3,'xe7.jpg'),(8,'xe đạp thường trumix',NULL,1,2,3,'xe8.jpg'),(9,'xe đạp điện nakxus',75,1,3,3,'xe9.jpg');
-- /*!40000 ALTER TABLE `bike` ENABLE KEYS */;
-- UNLOCK TABLES;



--
-- Table structure for table `bike`
--

DROP TABLE IF EXISTS `expectation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expectation` (
  `time` TIMESTAMP NOT NULL,
  `min` float NOT NULL,
  `max` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


-- Dumping data for table `expectation`


LOCK TABLES `expectation` WRITE;
/*!40000 ALTER TABLE `expectation` DISABLE KEYS */;
INSERT INTO `expectation` VALUES ('2022-03-01 00:00:00', 0.0, 100.0);
/*!40000 ALTER TABLE `expectation` ENABLE KEYS */;
UNLOCK TABLES;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-07  9:57:11
