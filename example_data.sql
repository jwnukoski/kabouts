-- MySQL dump 10.17  Distrib 10.3.25-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: kabouts
-- ------------------------------------------------------
-- Server version	10.3.25-MariaDB-0ubuntu1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blocks`
--

DROP TABLE IF EXISTS `blocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lvl` int(11) NOT NULL DEFAULT 0,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `loc_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `blocks_loc_id` (`loc_id`),
  CONSTRAINT `fk_blocks_locations` FOREIGN KEY (`loc_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blocks`
--

LOCK TABLES `blocks` WRITE;
/*!40000 ALTER TABLE `blocks` DISABLE KEYS */;
INSERT INTO `blocks` VALUES (1,0,2,5,1),(2,0,4,5,1),(3,0,3,5,1),(4,0,5,5,1),(5,0,6,5,1),(6,0,7,5,1),(7,0,8,5,1),(8,0,1,3,1),(9,0,2,3,1),(10,0,3,3,1),(11,0,4,3,1),(12,0,5,3,1),(13,0,6,3,1),(14,0,7,3,1),(15,0,1,2,1),(16,0,2,2,1),(17,0,3,2,1),(18,0,4,2,1),(19,0,5,2,1),(20,0,6,2,1),(21,0,7,2,1),(22,0,8,6,1),(23,0,7,6,1),(24,0,6,6,1),(25,0,5,6,1),(26,0,4,6,1),(27,0,3,6,1),(28,0,2,6,1),(29,0,1,6,1),(30,0,2,8,1),(31,0,3,8,1),(32,1,2,5,1),(33,1,4,5,1),(34,1,3,5,1),(35,1,5,5,1);
/*!40000 ALTER TABLE `blocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `info` text DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `block_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `items_block_id` (`block_id`),
  CONSTRAINT `fk_items_blocks` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'apple','https://picsum.photos/200',1),(2,'apricots','https://picsum.photos/200',2),(3,'avocado','https://picsum.photos/200',3),(4,'blackberries','https://picsum.photos/200',4),(5,'blackcurrant','https://picsum.photos/200',5),(6,'blueberries','https://picsum.photos/200',6),(7,'breadfruit','https://picsum.photos/200',7),(8,'cantaloupe','https://picsum.photos/200',8),(9,'carambola','https://picsum.photos/200',9),(10,'cherries','https://picsum.photos/200',10),(11,'cranberries','https://picsum.photos/200',11),(12,'figs','https://picsum.photos/200',12),(13,'grapefruit','https://picsum.photos/200',13),(14,'guava','https://picsum.photos/200',14),(15,'potatoes','https://picsum.photos/200',15),(16,'carrots','https://picsum.photos/200',16),(17,'mango','https://picsum.photos/200',17),(18,'pear','https://picsum.photos/200',18),(19,'plums','https://picsum.photos/200',19),(20,'plantain','https://picsum.photos/200',20),(21,'pineapple','https://picsum.photos/200',21),(22,'prunes','https://picsum.photos/200',22),(23,'raspberries','https://picsum.photos/200',23),(24,'rhubarb','https://picsum.photos/200',24),(25,'strawberries','https://picsum.photos/200',25),(26,'watermelon','https://picsum.photos/200',26),(27,'artichoke','https://picsum.photos/200',27),(28,'asparagus','https://picsum.photos/200',28),(29,'beets','https://picsum.photos/200',29),(30,'beans','https://picsum.photos/200',30),(31,'bok choy','https://picsum.photos/200',30),(32,'cabbage','https://picsum.photos/200',31),(33,'bread','https://picsum.photos/200',31),(34,'celery','https://picsum.photos/200',31),(35,'table','https://picsum.photos/200',32),(36,'shirt','https://picsum.photos/200',33),(37,'toys','https://picsum.photos/200',34),(38,'papertowels','https://picsum.photos/200',35),(39,'couch','https://picsum.photos/200',35);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loc_name` text DEFAULT NULL,
  `size_x` int(11) NOT NULL DEFAULT 10,
  `size_y` int(11) NOT NULL DEFAULT 10,
  `start_x` int(11) NOT NULL DEFAULT 0,
  `start_y` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'WallyMart - Floor 1',10,10,0,0);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stairs`
--

DROP TABLE IF EXISTS `stairs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stairs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loc_id` int(11) DEFAULT NULL,
  `on_lvl` int(11) NOT NULL DEFAULT 0,
  `to_lvl` int(11) NOT NULL DEFAULT 0,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stairs_loc_id` (`loc_id`),
  CONSTRAINT `fk_stairs_locations` FOREIGN KEY (`loc_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stairs`
--

LOCK TABLES `stairs` WRITE;
/*!40000 ALTER TABLE `stairs` DISABLE KEYS */;
INSERT INTO `stairs` VALUES (1,1,0,1,9,9),(2,1,1,0,9,9);
/*!40000 ALTER TABLE `stairs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-02 13:55:43
