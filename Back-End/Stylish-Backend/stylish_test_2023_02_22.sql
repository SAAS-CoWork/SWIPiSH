-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: stylish_test
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `picture` varchar(255) NOT NULL,
  `story` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product` (`product_id`),
  CONSTRAINT `campaign_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES (1,1,'campaigns/1_keyvisual.jpg','測試1'),(2,2,'campaigns/2_keyvisual.jpg','測試2'),(3,3,'campaigns/3_keyvisual.jpg','測試3');
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'FFFFFF','白色'),(2,'DDFFBB','亮綠');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hot`
--

DROP TABLE IF EXISTS `hot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hot` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hot`
--

LOCK TABLES `hot` WRITE;
/*!40000 ALTER TABLE `hot` DISABLE KEYS */;
INSERT INTO `hot` VALUES (1,'hot1'),(2,'hot2'),(3,'new hots');
/*!40000 ALTER TABLE `hot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hot_product`
--

DROP TABLE IF EXISTS `hot_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hot_product` (
  `hot_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`hot_id`,`product_id`),
  KEY `product` (`product_id`),
  CONSTRAINT `hot_product_ibfk_1` FOREIGN KEY (`hot_id`) REFERENCES `hot` (`id`),
  CONSTRAINT `hot_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hot_product`
--

LOCK TABLES `hot_product` WRITE;
/*!40000 ALTER TABLE `hot_product` DISABLE KEYS */;
INSERT INTO `hot_product` VALUES (1,1),(2,1),(3,1),(1,2),(3,2),(1,3),(3,3),(2,4);
/*!40000 ALTER TABLE `hot_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_table`
--

DROP TABLE IF EXISTS `order_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_table` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(255) NOT NULL,
  `time` bigint unsigned NOT NULL,
  `status` tinyint NOT NULL,
  `details` json NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `order_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_table`
--

LOCK TABLES `order_table` WRITE;
/*!40000 ALTER TABLE `order_table` DISABLE KEYS */;
INSERT INTO `order_table` VALUES (1,'122401090864',1677064109086,-1,'{\"list\": [{\"id\": 1, \"qty\": 1, \"name\": \"前開衩扭結洋裝\", \"size\": \"S\", \"color\": {\"code\": \"FFFFFF\", \"name\": \"白色\"}, \"price\": 1000, \"stock\": 2, \"main_image\": \"https://test/1/main.jpg\"}], \"total\": 1060, \"freight\": 60, \"payment\": \"credit_card\", \"shipping\": \"delivery\", \"subtotal\": 1000, \"recipient\": {\"name\": \"test\", \"time\": \"anytime\", \"email\": \"test@gmail.com\", \"phone\": \"0912345678\", \"address\": \"testaddress\"}}',1,1060),(2,'122401091096',1677064109109,0,'{\"list\": [{\"id\": 1, \"qty\": 1, \"name\": \"前開衩扭結洋裝\", \"size\": \"S\", \"color\": {\"code\": \"FFFFFF\", \"name\": \"白色\"}, \"price\": 1000, \"stock\": 2, \"main_image\": \"https://test/1/main.jpg\"}], \"total\": 1060, \"freight\": 60, \"payment\": \"credit_card\", \"shipping\": \"delivery\", \"subtotal\": 1000, \"recipient\": {\"name\": \"test\", \"time\": \"anytime\", \"email\": \"test@gmail.com\", \"phone\": \"0912345678\", \"address\": \"testaddress\"}}',1,1060);
/*!40000 ALTER TABLE `order_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `details` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_table` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,2,'{\"msg\": \"Success\", \"amount\": 8056, \"status\": 0, \"acquirer\": \"TW_CTBC\", \"currency\": \"TWD\", \"auth_code\": \"132481\", \"card_info\": {\"type\": 1, \"level\": \"\", \"issuer\": \"\", \"bank_id\": \"\", \"country\": \"UNITED KINGDOM\", \"funding\": 0, \"bin_code\": \"424242\", \"last_four\": \"4242\", \"country_code\": \"GB\", \"issuer_zh_tw\": \"\"}, \"merchant_id\": \"AppWorksSchool_CTBC\", \"order_number\": \"\", \"rec_trade_id\": \"D20200210eKvZyv\", \"bank_result_msg\": \"\", \"card_identifier\": \"dee921560b074be7a860a6b44a80c21b\", \"bank_result_code\": \"\", \"bank_transaction_id\": \"TP20200210eKvZyv\", \"bank_transaction_time\": {\"end_time_millis\": \"1581325720251\", \"start_time_millis\": \"1581325720251\"}, \"transaction_time_millis\": 1581325720207}');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(127) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int unsigned NOT NULL,
  `texture` varchar(127) NOT NULL,
  `wash` varchar(127) NOT NULL,
  `place` varchar(127) NOT NULL,
  `note` varchar(127) NOT NULL,
  `story` text NOT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category` (`category`),
  KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'men','product1','Product 1',100,'pt1','pw1','pp1','pn1','ps1','products/1_main.jpg'),(2,'women','product2','Product 2',200,'pt2','pw2','pp2','pn2','ps2','products/2_main.jpg'),(3,'men','product3','Product 3',300,'pt3','pw3','pp3','pn3','ps3','products/3_main.jpg'),(4,'accessories','product4','Product 4',400,'pt4','pw4','pp4','pn4','ps4','products/4_main.jpg'),(5,'accessories','product5','Product 5',500,'pt5','pw5','pp5','pn5','ps5','products/5_main.jpg'),(6,'accessories','product6','Product 6',600,'pt6','pw6','pp6','pn6','ps6','products/6_main.jpg'),(7,'women','product7','Product 7',700,'pt7','pw7','pp7','pn7','ps7','products/7_main.jpg'),(8,'men','product8','Product 8',800,'pt8','pw8','pp8','pn8','ps8xwxw','products/8_main.jpg'),(9,'men','product9','Product 9',900,'pt9','pw9','pp9','pn9','ps9xwxw','products/9_main.jpg'),(10,'men','test searchkey product10','Product 10',1000,'pt10','pw10','pp10','pn10','ps10xwxw','products/10_main.jpg'),(11,'men','test searchkey product11','Product 11',1100,'pt11','pw11','pp11','pn11','ps11xwxw','products/11_main.jpg'),(12,'men','test searchkey product12','Product 12',1200,'pt12','pw12','pp12','pn12','ps12xwxw','products/12_main.jpg'),(13,'men','test searchkey product13','Product 13',1300,'pt13','pw13','pp13','pn13','ps13xwxw','products/13_main.jpg'),(14,'men','test searchkey product14','Product 14',1400,'pt14','pw14','pp14','pn14','ps14xwxw','products/14_main.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `image` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_images_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,'products/1_0.jpg'),(2,1,'products/1_1.jpg'),(3,1,'products/1_0.jpg'),(4,1,'products/1_1.jpg'),(5,2,'products/2_0.jpg'),(6,2,'products/2_1.jpg'),(7,2,'products/2_0.jpg'),(8,2,'products/2_1.jpg'),(9,3,'products/3_0.jpg'),(10,3,'products/3_1.jpg'),(11,3,'products/3_0.jpg'),(12,3,'products/3_1.jpg'),(13,4,'products/4_0.jpg'),(14,4,'products/4_1.jpg'),(15,4,'products/4_0.jpg'),(16,4,'products/4_1.jpg'),(17,5,'products/5_0.jpg'),(18,5,'products/5_1.jpg'),(19,5,'products/5_0.jpg'),(20,5,'products/5_1.jpg'),(21,6,'products/6_0.jpg'),(22,6,'products/6_1.jpg'),(23,6,'products/6_0.jpg'),(24,6,'products/6_1.jpg'),(25,7,'products/7_0.jpg'),(26,7,'products/7_1.jpg'),(27,7,'products/7_0.jpg'),(28,7,'products/7_1.jpg'),(29,8,'products/8_0.jpg'),(30,8,'products/8_1.jpg'),(31,8,'products/8_0.jpg'),(32,8,'products/8_1.jpg'),(33,9,'products/9_0.jpg'),(34,9,'products/9_1.jpg'),(35,9,'products/9_0.jpg'),(36,9,'products/9_1.jpg'),(37,10,'products/10_0.jpg'),(38,10,'products/10_1.jpg'),(39,10,'products/10_0.jpg'),(40,10,'products/10_1.jpg'),(41,11,'products/11_0.jpg'),(42,11,'products/11_1.jpg'),(43,11,'products/11_0.jpg'),(44,11,'products/11_1.jpg'),(45,12,'products/12_0.jpg'),(46,12,'products/12_1.jpg'),(47,12,'products/12_0.jpg'),(48,12,'products/12_1.jpg'),(49,13,'products/13_0.jpg'),(50,13,'products/13_1.jpg'),(51,13,'products/13_0.jpg'),(52,13,'products/13_1.jpg'),(53,14,'products/14_0.jpg'),(54,14,'products/14_1.jpg'),(55,14,'products/14_0.jpg'),(56,14,'products/14_1.jpg');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int unsigned DEFAULT NULL,
  `provider` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(127) NOT NULL,
  `picture` varchar(500) DEFAULT NULL,
  `access_token` varchar(1000) NOT NULL DEFAULT '',
  `access_expired` bigint unsigned NOT NULL,
  `login_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `user` (`provider`,`email`,`password`),
  KEY `access_token` (`access_token`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'native','test1@gmail.com','$2b$10$d5SbpSYiYHVhBwnHH6VQhu/lyRN9n5E6JoZXqINBmk4uAtVtyp9rC','test1',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJ0ZXN0MSIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwicGljdHVyZSI6bnVsbCwiaWF0IjoxNjc3MDY0MTA5fQ.hT3HXHjLiCMzenbCwQX0GsV5V2rJebEByeIy5Myfd08',2592000,'2023-02-22 19:08:30'),(2,2,'facebook','test2@gmail.com',NULL,'test2','https://graph.facebook.com/1/picture?type=large','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6ImZhY2Vib29rIiwibmFtZSI6InRlc3QyIiwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vMjIyMi9waWN0dXJlP3R5cGU9bGFyZ2UiLCJpYXQiOjE2NzcwNjQxMDl9.uyXBOMXYAvbtcAJBIvay3MbHGnzTZ8y4jmtlYRq6LMw',2592000,'2023-02-22 19:08:30'),(3,2,'native','test3@gmail.com','$2b$10$Bi6sGbjUdLkbEoo1Dbd9/.GRa2aeehZauAnRLPIahb1iXou34z1ou','test3',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJ0ZXN0MyIsImVtYWlsIjoidGVzdDNAZ21haWwuY29tIiwicGljdHVyZSI6bnVsbCwiaWF0IjoxNjc3MDY0MTA4fQ.zq9SeMOQBQrjAni2Cl0gWHPpQMQGK4rxG5xb0XFI2y4',2592000,'2023-02-22 19:08:29'),(4,2,'native','arthur@gmail.com','$2b$10$9hecjGhV/ohQU2ECpgrem.OvvEVNhUwssxAdjSMt3uMhhOA5QnRxG','arthur',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJhcnRodXIiLCJlbWFpbCI6ImFydGh1ckBnbWFpbC5jb20iLCJwaWN0dXJlIjpudWxsLCJpYXQiOjE2NzcwNjQxMDl9.vb4BB-44ibSGihbOONFg6Qd1JY6JNtFeMXfV-pedY-U',2592000,'2023-02-22 19:08:29'),(6,2,'facebook','fakefbuser@gmail.com',NULL,'fake fb user','https://graph.facebook.com/1111/picture?type=large','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6ImZhY2Vib29rIiwibmFtZSI6ImZha2UgZmIgdXNlciIsImVtYWlsIjoiZmFrZWZidXNlckBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vMTExMS9waWN0dXJlP3R5cGU9bGFyZ2UiLCJpYXQiOjE2NzcwNjQxMDl9.QP6ygFiCF15c5Mbkz7TOEqPIxryCknimEcQiQ5n0hR4',2592000,'2023-02-22 19:08:30');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variant` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `color_id` int unsigned DEFAULT NULL,
  `size` varchar(15) NOT NULL,
  `stock` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product` (`product_id`),
  CONSTRAINT `variant_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant`
--

LOCK TABLES `variant` WRITE;
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;
INSERT INTO `variant` VALUES (1,1,1,'S',2),(2,1,1,'M',5),(3,1,2,'S',2),(4,2,1,'S',2),(5,2,2,'L',2);
/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-22 11:23:23
