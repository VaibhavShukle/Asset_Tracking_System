-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2024 at 07:48 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ams`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int(100) NOT NULL,
  `asset_id` varchar(50) NOT NULL,
  `asset_name` varchar(200) NOT NULL,
  `asset_brand` varchar(100) NOT NULL,
  `asset_model` varchar(100) NOT NULL,
  `asset_location` varchar(200) NOT NULL,
  `asset_department` varchar(50) NOT NULL,
  `asset_category` varchar(200) NOT NULL,
  `asset_subcategory` varchar(200) NOT NULL,
  `asset_purchaseDate` date NOT NULL,
  `asset_Cost` int(50) NOT NULL,
  `asset_owner` varchar(200) NOT NULL,
  `asset_vendorInfo` varchar(200) NOT NULL,
  `asset_serialNumber` varchar(200) NOT NULL,
  `asset_condition` int(100) NOT NULL,
  `asset_image` varchar(255) DEFAULT NULL,
  `depreciation_percentage` int(100) DEFAULT NULL,
  `asset_life` int(100) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `accu_status` tinyint(4) DEFAULT 1,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp(),
  `createdBy` tinyint(4) NOT NULL DEFAULT 1,
  `updatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedBy` tinyint(4) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `asset_id`, `asset_name`, `asset_brand`, `asset_model`, `asset_location`, `asset_department`, `asset_category`, `asset_subcategory`, `asset_purchaseDate`, `asset_Cost`, `asset_owner`, `asset_vendorInfo`, `asset_serialNumber`, `asset_condition`, `asset_image`, `depreciation_percentage`, `asset_life`, `status`, `accu_status`, `createdOn`, `createdBy`, `updatedOn`, `updatedBy`, `isDeleted`) VALUES
(1, 'WHT1001', 'Laptop', '1', 'ABC', '1', '1', '1', '2', '2020-01-15', 5000, 'ABC', 'XYZ', 'ihiuhiuguiui', 1, 'public/stockimages/356501300_256.jpg', 12, 4, 1, 1, '2024-01-03 11:35:12', 1, '2024-01-03 11:35:12', 1, 1),
(2, 'WHT1002', 'Keyboard', '2', 'Lenovo', '1', '4', '1', '2', '2024-01-01', 2000, 'ABC', 'Vendor', 'Lenovo785412yhk', 2, 'public/stockimages/134860556_256.jpg', 25, 2, 1, 1, '2024-01-04 06:54:29', 1, '2024-01-04 06:54:29', 1, 1),
(3, 'WHT1003', 'Crompton Fan', '5', 'SR132', '1', '3', '3', '4', '2024-01-16', 8000, 'ABC', 'XYZ', 'SR475896TY', 2, 'public\\images\\asset_image1705575811537.jpg', 25, 2, 1, 1, '2024-01-18 11:03:31', 1, '2024-01-18 11:03:31', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `assets_maintenance_history`
--

CREATE TABLE `assets_maintenance_history` (
  `maintenance_id` int(100) NOT NULL,
  `asset_id` int(50) NOT NULL,
  `maintenance_Date` datetime NOT NULL,
  `desc_maintenance` longtext NOT NULL,
  `maintenance_cost` int(50) NOT NULL,
  `maintenance_notes` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asset_condition`
--

CREATE TABLE `asset_condition` (
  `id` int(50) NOT NULL,
  `condition` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `createdOn` date NOT NULL DEFAULT current_timestamp(),
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `asset_condition`
--

INSERT INTO `asset_condition` (`id`, `condition`, `status`, `createdOn`, `isDeleted`) VALUES
(1, 'Bad', 1, '2023-11-24', 1),
(2, 'Good', 1, '2023-11-24', 1),
(3, 'Undermaintanance', 1, '2023-11-24', 1),
(4, 'Slow', 1, '2023-11-24', 1),
(5, 'Moderate', 1, '2023-11-24', 1);

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `brand_id` int(100) NOT NULL,
  `brand_name` varchar(200) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`brand_id`, `brand_name`, `status`, `isDeleted`) VALUES
(1, 'HP', 1, 1),
(2, 'AOC', 1, 1),
(3, 'Samsung', 1, 1),
(4, 'Apple', 1, 1),
(5, 'Crompton', 1, 1),
(6, 'Asus', 1, 1),
(7, 'Lenovo', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(50) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(10) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `status`, `isDeleted`) VALUES
(1, 'Electronic', 1, 1),
(2, 'Furniture', 1, 1),
(3, 'Electrical', 1, 1),
(4, 'test', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `userAssign_id` int(100) NOT NULL,
  `user_id` int(50) NOT NULL,
  `asset_id` varchar(500) NOT NULL,
  `assign_date` datetime NOT NULL DEFAULT current_timestamp(),
  `return_date` datetime DEFAULT NULL,
  `product_condition` varchar(100) DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0.unavailable,1.available',
  `createdBy` tinyint(4) NOT NULL DEFAULT 1,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedBy` tinyint(4) NOT NULL DEFAULT 1,
  `updatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `checkout`
--

INSERT INTO `checkout` (`userAssign_id`, `user_id`, `asset_id`, `assign_date`, `return_date`, `product_condition`, `remark`, `status`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `isDeleted`) VALUES
(28, 1, 'WHT1001', '2024-01-07 11:52:00', '2024-01-08 06:55:00', '2', 'good', 1, 1, '2024-01-07 11:52:57', 1, '2024-01-07 11:52:57', 1),
(29, 2, 'WHT1002', '2024-01-08 06:59:00', '2024-01-08 07:22:00', '5', 'iuhui', 1, 1, '2024-01-08 06:59:51', 1, '2024-01-08 06:59:51', 1),
(30, 1, 'WHT1001', '2024-01-07 07:23:00', '2024-01-07 07:24:00', '4', 'gdghd', 1, 1, '2024-01-08 07:23:40', 1, '2024-01-08 07:23:40', 1),
(31, 1, 'WHT1001', '2024-01-08 07:31:00', '2024-01-08 07:31:00', '2', 'gfhg', 1, 1, '2024-01-08 07:31:10', 1, '2024-01-08 07:31:10', 1),
(32, 1, 'WHT1001', '2024-01-08 09:43:00', '2024-01-08 09:43:00', '2', 'jkhkh', 1, 1, '2024-01-08 09:43:29', 1, '2024-01-08 09:43:29', 1),
(33, 6, 'WHT1001', '2024-01-08 10:12:00', '2024-01-08 10:16:00', '2', 'etgdfhfd', 1, 1, '2024-01-08 10:12:29', 1, '2024-01-08 10:12:29', 1),
(34, 1, 'WHT1001', '2024-01-08 11:25:00', '2024-01-09 12:51:00', '5', 'vc', 1, 1, '2024-01-08 11:25:56', 1, '2024-01-08 11:25:56', 1),
(35, 2, 'WHT1002', '2024-01-08 11:33:00', '2024-01-27 13:47:00', '3', 'aaa', 1, 1, '2024-01-08 11:33:30', 1, '2024-01-08 11:33:30', 1),
(36, 6, 'WHT1001', '2024-01-16 09:44:00', '2024-01-15 11:04:00', '3', 'abc', 1, 1, '2024-01-16 09:44:23', 1, '2024-01-16 09:44:23', 1),
(37, 1, 'WHT1002', '2024-01-20 15:11:00', '2024-01-18 11:46:00', '3', 'aa', 1, 1, '2024-01-18 11:07:28', 1, '2024-01-18 11:07:28', 1);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dept_id` int(50) NOT NULL,
  `dept_name` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dept_id`, `dept_name`, `status`, `isDeleted`) VALUES
(1, 'Web Development', 1, 1),
(2, 'Mobility', 1, 1),
(3, 'Android Development', 1, 1),
(4, 'Admin', 1, 1),
(5, 'test', 1, 1),
(6, 'test2', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `depreciation`
--

CREATE TABLE `depreciation` (
  `depreciation_id` int(100) NOT NULL,
  `depreciation_cost` int(100) NOT NULL,
  `asset_life` int(100) NOT NULL,
  `date_acquired` date NOT NULL,
  `salvageValue` int(100) NOT NULL,
  `depreciation_Type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `doc_id` int(50) NOT NULL,
  `asset_id` int(100) NOT NULL,
  `doc_title` varchar(200) NOT NULL,
  `document` varchar(100) NOT NULL,
  `doc_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`doc_id`, `asset_id`, `doc_title`, `document`, `doc_date`) VALUES
(9, 3, 'Doc', 'Msc_Final_Result.pdf', '2024-01-05'),
(11, 2, 'Doc', 'Biodata.pdf', '2024-01-18');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(100) NOT NULL,
  `asset_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `event` varchar(200) NOT NULL,
  `field` varchar(200) NOT NULL,
  `changedFrom` varchar(200) NOT NULL,
  `changedTo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `asset_id`, `date`, `event`, `field`, `changedFrom`, `changedTo`) VALUES
(1, 0, '2024-01-04 13:39:31', 'checkin', 'status', 'Unavailable', 'Available'),
(2, 0, '2024-01-05 05:53:08', 'checkout', 'status', 'Available', 'Unavailable'),
(3, 0, '2024-01-05 10:07:55', 'checkin', 'status', 'Unavailable', 'Available'),
(4, 0, '2024-01-05 10:13:40', 'checkout', 'status', 'Available', 'Unavailable'),
(5, 0, '2024-01-05 11:15:28', 'checkout', 'status', 'Available', 'Unavailable'),
(6, 0, '2024-01-05 11:16:55', 'checkin', 'status', 'Unavailable', 'Available'),
(7, 0, '2024-01-05 11:17:15', 'checkout', 'status', 'Available', 'Unavailable'),
(8, 0, '2024-01-05 11:17:34', 'checkin', 'status', 'Unavailable', 'Available'),
(9, 0, '2024-01-05 11:18:03', 'checkout', 'status', 'Available', 'Unavailable'),
(10, 0, '2024-01-05 11:18:39', 'checkin', 'status', 'Unavailable', 'Available'),
(11, 0, '2024-01-05 11:24:22', 'checkout', 'status', 'Available', 'Unavailable'),
(12, 0, '2024-01-05 11:24:43', 'checkin', 'status', 'Unavailable', 'Available'),
(13, 0, '2024-01-05 11:26:45', 'checkout', 'status', 'Available', 'Unavailable'),
(14, 0, '2024-01-05 11:26:59', 'checkin', 'status', 'Unavailable', 'Available'),
(15, 3, '2024-01-05 12:44:26', 'Maintenance(update)', 'main_by', 'xyz', 'abc'),
(16, 3, '2024-01-05 12:44:51', 'warranty(update)', 'war_length', '12', '4'),
(17, 3, '2024-01-05 12:44:51', 'warranty(update)', 'notes', 'abc', 'xyz'),
(18, 3, '2024-01-05 13:37:36', 'warranty(update)', 'exp_date', '2024-01-04', '2024-01-07'),
(19, 3, '2024-01-05 13:37:49', 'Maintenance(update)', 'main_by', 'abc', 'xyz'),
(20, 0, '2024-01-05 13:39:51', 'checkout', 'status', 'Available', 'Unavailable'),
(21, 0, '2024-01-05 13:42:08', 'checkin', 'status', 'Unavailable', 'Available'),
(22, 3, '2024-01-07 11:08:17', 'warranty(update)', 'exp_date', '2024-01-07', '2024-01-31'),
(23, 3, '2024-01-07 11:45:32', 'warranty', 'warranty', '', ''),
(24, 3, '2024-01-07 11:48:04', 'warranty', 'warranty', '', ''),
(25, 4, '2024-01-07 11:51:45', 'warranty', 'warranty', '', ''),
(26, 0, '2024-01-07 11:52:57', 'checkout', 'status', 'Available', 'Unavailable'),
(27, 3, '2024-01-07 11:55:15', 'warranty', 'warranty', '', ''),
(28, 3, '2024-01-07 11:58:33', 'warranty', 'warranty', '', ''),
(29, 4, '2024-01-08 06:04:02', 'Maintenance', 'Maintenance', '', ''),
(30, 0, '2024-01-08 06:55:58', 'checkin', 'status', 'Unavailable', 'Available'),
(31, 0, '2024-01-08 06:59:51', 'checkout', 'status', 'Available', 'Unavailable'),
(32, 0, '2024-01-08 07:23:06', 'checkin', 'status', 'Unavailable', 'Available'),
(33, 0, '2024-01-08 07:23:40', 'checkout', 'status', 'Available', 'Unavailable'),
(34, 0, '2024-01-08 07:24:42', 'checkin', 'status', 'Unavailable', 'Available'),
(35, 0, '2024-01-08 07:31:10', 'checkout', 'status', 'Available', 'Unavailable'),
(36, 0, '2024-01-08 07:31:31', 'checkin', 'status', 'Unavailable', 'Available'),
(37, 0, '2024-01-08 09:43:29', 'checkout', 'status', 'Available', 'Unavailable'),
(38, 0, '2024-01-08 09:43:49', 'checkin', 'status', 'Unavailable', 'Available'),
(39, 0, '2024-01-08 10:12:29', 'checkout', 'status', 'Available', 'Unavailable'),
(40, 0, '2024-01-08 10:16:21', 'checkin', 'status', 'Unavailable', 'Available'),
(41, 0, '2024-01-08 11:25:56', 'checkout', 'status', 'Available', 'Unavailable'),
(42, 0, '2024-01-08 11:33:30', 'checkout', 'status', 'Available', 'Unavailable'),
(43, 0, '2024-01-09 09:44:08', 'checkin', 'status', 'Unavailable', 'Available'),
(44, 0, '2024-01-09 12:51:39', 'checkin', 'status', 'Unavailable', 'Available'),
(45, 3, '2024-01-09 12:52:06', 'warranty(update)', 'war_length', '12', '24'),
(46, 0, '2024-01-16 09:44:23', 'checkout', 'status', 'Available', 'Unavailable'),
(47, 0, '2024-01-18 11:05:11', 'checkin', 'status', 'Unavailable', 'Available'),
(48, 0, '2024-01-18 11:07:28', 'checkout', 'status', 'Available', 'Unavailable'),
(49, 2, '2024-01-18 11:10:07', 'warranty', 'warranty', '', ''),
(50, 2, '2024-01-18 11:10:28', 'warranty(update)', 'exp_date', '2024-01-18', '2024-02-18'),
(51, 2, '2024-01-18 11:41:13', 'warranty(update)', 'exp_date', '2024-02-18', '2024-01-17'),
(52, 0, '2024-01-18 11:46:31', 'checkin', 'status', 'Unavailable', 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `image_id` int(100) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `asset_id` int(100) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp(),
  `createdBy` tinyint(4) NOT NULL DEFAULT 1,
  `updatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedBy` tinyint(4) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`image_id`, `image_path`, `asset_id`, `createdOn`, `createdBy`, `updatedOn`, `updatedBy`, `isDeleted`) VALUES
(5, 'public\\images\\imagePath1705388691248.jpg', 3, '2024-01-16 07:04:51', 1, '2024-01-16 07:04:51', 1, 1),
(6, 'public\\images\\imagePath1705572063642.jpg', 3, '2024-01-18 10:01:03', 1, '2024-01-18 10:01:03', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(50) NOT NULL,
  `location_name` varchar(200) NOT NULL,
  `location_address` varchar(250) NOT NULL,
  `location_desc` longtext NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `location_name`, `location_address`, `location_desc`, `status`, `isDeleted`) VALUES
(1, 'Nashik', 'Nashik', 'Nashik', 1, 1),
(2, 'Pune', 'Pune', 'Pune', 1, 1),
(3, 'Mumbai', 'Mumbai', 'Mumbai', 1, 1),
(4, 'Bangalore', 'Bangalore', 'Bangalore', 1, 1),
(5, 'test', 'test', 'test', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', '123');

-- --------------------------------------------------------

--
-- Table structure for table `maintenance`
--

CREATE TABLE `maintenance` (
  `main_id` int(100) NOT NULL,
  `asset_id` int(100) NOT NULL,
  `main_title` varchar(255) NOT NULL,
  `main_details` varchar(250) NOT NULL,
  `main_date` date NOT NULL DEFAULT current_timestamp(),
  `main_by` varchar(200) NOT NULL,
  `mainStatus_id` int(50) NOT NULL,
  `main_complete` date NOT NULL DEFAULT current_timestamp(),
  `main_cost` varchar(50) NOT NULL,
  `main_warranty` date NOT NULL DEFAULT current_timestamp(),
  `createdOn` datetime NOT NULL DEFAULT current_timestamp(),
  `createdBy` tinyint(4) NOT NULL DEFAULT 1,
  `updatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedBy` tinyint(4) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maintenance`
--

INSERT INTO `maintenance` (`main_id`, `asset_id`, `main_title`, `main_details`, `main_date`, `main_by`, `mainStatus_id`, `main_complete`, `main_cost`, `main_warranty`, `createdOn`, `createdBy`, `updatedOn`, `updatedBy`, `isDeleted`) VALUES
(3, 4, 'Maintenance', 'Maintenance', '2024-01-31', 'vendor', 4, '2024-01-30', '250', '2024-01-04', '2024-01-04 07:22:54', 1, '2024-01-04 07:22:54', 1, 1),
(5, 3, 'abc', 'xyz', '2024-01-17', 'xyz', 2, '2024-01-25', '456', '2024-01-31', '2024-01-04 13:04:51', 1, '2024-01-04 13:04:51', 1, 1),
(6, 4, 'dfgdg', 'fgdgd', '2024-01-08', 'fgdfgd', 2, '2024-01-31', '500', '2024-01-15', '2024-01-08 06:04:02', 1, '2024-01-08 06:04:02', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `main_status`
--

CREATE TABLE `main_status` (
  `mainStatus_id` int(50) NOT NULL,
  `mainStatus_name` varchar(200) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `main_status`
--

INSERT INTO `main_status` (`mainStatus_id`, `mainStatus_name`, `status`, `isDeleted`) VALUES
(1, 'Scheduled', 'active', 1),
(2, 'In Progress', 'active', 1),
(3, 'On Hold', 'active', 1),
(4, 'Cancelled', 'active', 1),
(5, 'Completed', 'active', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `subcategory_id` int(50) NOT NULL,
  `subcategory_name` varchar(200) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `category_id` int(100) NOT NULL,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`subcategory_id`, `subcategory_name`, `status`, `category_id`, `isDeleted`) VALUES
(1, 'Table', 1, 2, 1),
(2, 'Desktop', 1, 1, 1),
(3, 'Laptop', 1, 3, 1),
(4, 'Fan', 1, 3, 1),
(5, 'AC', 1, 1, 1),
(6, 'Monitor', 1, 1, 1),
(8, 'test', 1, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(100) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_dept` varchar(200) NOT NULL,
  `user_contact` int(10) NOT NULL,
  `user_type` varchar(200) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `createdBy` tinyint(4) NOT NULL DEFAULT 1,
  `createdOn` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedBy` tinyint(4) NOT NULL DEFAULT 1,
  `updatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `u_id` int(100) NOT NULL,
  `u_name` varchar(100) NOT NULL,
  `u_empid` int(100) NOT NULL,
  `u_phone` varchar(100) NOT NULL,
  `u_email` varchar(100) NOT NULL,
  `location_id` int(100) NOT NULL,
  `dept_id` int(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`u_id`, `u_name`, `u_empid`, `u_phone`, `u_email`, `location_id`, `dept_id`, `status`, `isDeleted`) VALUES
(1, 'Rakesh Shinde', 101, '9632587410', 'rakesh@gmail.com', 1, 1, 1, 1),
(2, 'Vaibhav Shukle', 102, '9632587410', 'vaibhav@gmail.com', 1, 3, 1, 1),
(6, 'Sumit Sonawane', 103, '8532145698', 'sumit@gmail.com', 3, 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `v_id` int(100) NOT NULL,
  `v_name` varchar(200) NOT NULL,
  `v_phone` varchar(200) NOT NULL,
  `v_address` varchar(250) NOT NULL,
  `v_details` longtext NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `createdOn` date NOT NULL DEFAULT current_timestamp(),
  `isDeleted` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`v_id`, `v_name`, `v_phone`, `v_address`, `v_details`, `status`, `createdOn`, `isDeleted`) VALUES
(1, 'Vender1', '9854236588', 'xyz', 'abc', 1, '2023-11-03', 1),
(2, 'Vendor2', '7412589632', 'ABCD', 'ABCD', 1, '2023-11-03', 1),
(3, 'Vendor3', '7894561230', 'XYZ', 'ABC', 1, '2023-12-05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `warranty`
--

CREATE TABLE `warranty` (
  `warranty_id` int(100) NOT NULL,
  `asset_id` int(100) NOT NULL,
  `exp_date` date NOT NULL DEFAULT current_timestamp(),
  `war_length` varchar(100) NOT NULL,
  `notes` varchar(100) NOT NULL,
  `status` tinyint(100) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `warranty`
--

INSERT INTO `warranty` (`warranty_id`, `asset_id`, `exp_date`, `war_length`, `notes`, `status`) VALUES
(13, 3, '2024-12-31', '24', 'in warranty', 1),
(14, 2, '2024-01-17', '12', 'Expired', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assets_maintenance_history`
--
ALTER TABLE `assets_maintenance_history`
  ADD PRIMARY KEY (`maintenance_id`);

--
-- Indexes for table `asset_condition`
--
ALTER TABLE `asset_condition`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`userAssign_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dept_id`);

--
-- Indexes for table `depreciation`
--
ALTER TABLE `depreciation`
  ADD PRIMARY KEY (`depreciation_id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`doc_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`main_id`);

--
-- Indexes for table `main_status`
--
ALTER TABLE `main_status`
  ADD PRIMARY KEY (`mainStatus_id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`subcategory_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`u_id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`v_id`);

--
-- Indexes for table `warranty`
--
ALTER TABLE `warranty`
  ADD PRIMARY KEY (`warranty_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `assets_maintenance_history`
--
ALTER TABLE `assets_maintenance_history`
  MODIFY `maintenance_id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asset_condition`
--
ALTER TABLE `asset_condition`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `brand_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `checkout`
--
ALTER TABLE `checkout`
  MODIFY `userAssign_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `dept_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `depreciation`
--
ALTER TABLE `depreciation`
  MODIFY `depreciation_id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `doc_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `image_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `maintenance`
--
ALTER TABLE `maintenance`
  MODIFY `main_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `main_status`
--
ALTER TABLE `main_status`
  MODIFY `mainStatus_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `subcategory_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `u_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `v_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `warranty`
--
ALTER TABLE `warranty`
  MODIFY `warranty_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
