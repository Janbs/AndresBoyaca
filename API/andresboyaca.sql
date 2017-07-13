/*
Navicat MySQL Data Transfer

Source Server         : LOCAL
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : andresboyaca

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-07-12 23:19:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id Registro',
  `nombre` varchar(255) DEFAULT NULL COMMENT 'Nombre del customer  podria tener una fk',
  `tipo_identificacion` varchar(255) DEFAULT NULL COMMENT 'tipo identifiacion custome',
  `identificacion` int(11) DEFAULT NULL COMMENT 'numero identificacion customer',
  `numero` varchar(255) DEFAULT NULL COMMENT 'numero telefonico',
  `fecha_nacimiento` date DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of customer
-- ----------------------------
