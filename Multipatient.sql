-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2020 at 12:59 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mutipatientmonitor`
--

-- --------------------------------------------------------

--
-- Table structure for table `Heart_Rate`
--

CREATE TABLE `Heart_Rate` (
  `id` int(11) NOT NULL,
  `level` varchar(50) NOT NULL,
  `value` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sensors_data_date` date NOT NULL,
  `sensors_data_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Heart_Rate`
--

INSERT INTO `Heart_Rate` (`id`, `level`, `value`, `username`,`dt`, `sensors_data_date`, `sensors_data_time`) VALUES
(1, 'ABNORMAL', '60', 'Patient1','2019-12-27 04:26:28', '0000-00-00', '00:00:00'),
(2, 'ABNORMAL', '70', 'Patient2','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(3, 'ABNORMAL', '70', 'Patient3','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(4, 'ABNORMAL', '70', 'Patient4','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(5, 'ABNORMAL', '70', 'Patient5','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(6, 'ABNORMAL', '70', 'Patient6','2019-12-28 04:02:53', '2019-12-28', '09:32:53');
-- --------------------------------------------------------



--
-- Table structure for table `Heart_Rate`
--

CREATE TABLE `Temperature` (
  `id` int(11) NOT NULL,
  `level` varchar(50) NOT NULL,
  `value` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sensors_data_date` date NOT NULL,
  `sensors_data_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Heart_Rate`
--

INSERT INTO `Temperature` (`id`, `level`, `value`, `username`,`dt`, `sensors_data_date`, `sensors_data_time`) VALUES
(1, 'ABNORMAL', '40', 'Patient1','2019-12-27 04:26:28', '0000-00-00', '00:00:00'),
(2, 'ABNORMAL', '50', 'Patient2','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(3, 'ABNORMAL', '60', 'Patient3','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(4, 'ABNORMAL', '20', 'Patient4','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(5, 'ABNORMAL', '30', 'Patient5','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(6, 'ABNORMAL', '40', 'Patient6','2019-12-28 04:02:53', '2019-12-28', '09:32:53');
-- --------------------------------------------------------


--
-- Table structure for table `Oxidation`
--

CREATE TABLE `Oxidation` (
  `id` int(11) NOT NULL,
  `level` varchar(50) NOT NULL,
  `value` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sensors_data_date` date NOT NULL,
  `sensors_data_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Heart_Rate`
--

CREATE TABLE `Patient_status` (
  `id` int(11) NOT NULL,
  `level` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sensors_data_date` date NOT NULL,
  `sensors_data_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Heart_Rate`
--

INSERT INTO `Oxidation` (`id`, `level`, `value`, `username`,`dt`, `sensors_data_date`, `sensors_data_time`) VALUES
(1, 'ABNORMAL', '40', 'Patient1','2019-12-27 04:26:28', '0000-00-00', '00:00:00'),
(2, 'ABNORMAL', '50', 'Patient2','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(3, 'ABNORMAL', '60', 'Patient3','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(4, 'ABNORMAL', '20', 'Patient4','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(5, 'ABNORMAL', '30', 'Patient5','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(6, 'ABNORMAL', '40', 'Patient6','2019-12-28 04:02:53', '2019-12-28', '09:32:53');
-- --------------------------------------------------------


--
-- Table structure for table `Respiration`
--

CREATE TABLE `Respiration` (
  `id` int(11) NOT NULL,
  `level` varchar(50) NOT NULL,
  `value` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sensors_data_date` date NOT NULL,
  `sensors_data_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Heart_Rate`
--

INSERT INTO `Respiration` (`id`, `level`, `value`, `username`,`dt`, `sensors_data_date`, `sensors_data_time`) VALUES
(1, 'ABNORMAL', '40', 'Patient1','2019-12-27 04:26:28', '0000-00-00', '00:00:00'),
(2, 'ABNORMAL', '50', 'Patient2','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(3, 'ABNORMAL', '60', 'Patient3','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(4, 'ABNORMAL', '20', 'Patient4','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(5, 'ABNORMAL', '30', 'Patient5','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(6, 'ABNORMAL', '40', 'Patient6','2019-12-28 04:02:53', '2019-12-28', '09:32:53');
-- --------------------------------------------------------


--
-- Dumping data for table `Patient_status`
--

INSERT INTO `Patient_status` (`id`,`level`, `username`,`dt`, `sensors_data_date`, `sensors_data_time`) VALUES
(1, 'Normal',  'Patient1','2019-12-27 04:26:28', '0000-00-00', '00:00:00'),
(2, 'Normal',  'Patient2','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(3, 'Normal',  'Patient3','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(4, 'Abnormal',  'Patient4','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(5, 'Abnormal',  'Patient5','2019-12-28 04:02:53', '2019-12-28', '09:32:53'),
(6, 'Normal',  'Patient6','2019-12-28 04:02:53', '2019-12-28', '09:32:53');
-- --------------------------------------------------------






--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mobile` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `dt`, `mobile`) VALUES
(1, 'level', '$2a$10$3qewR2D9ZaK6nVLpz5mKD.2ASbeRTmAme7j/AgHzpt3Y4Y/lTa/ii', '2019-03-15 17:25:26', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Heart_Rate`
--
ALTER TABLE `Heart_Rate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Temperature`
--
ALTER TABLE `Temperature`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Oxidation`
--
ALTER TABLE `Oxidation`
  ADD PRIMARY KEY (`id`);


--
-- Indexes for table `Oxidation`
--
ALTER TABLE `Respiration`
  ADD PRIMARY KEY (`id`);


  --
-- Indexes for table `Oxidation`
--
ALTER TABLE `Patient_status`
  ADD PRIMARY KEY (`id`);


--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Heart_Rate`
--
ALTER TABLE `Heart_Rate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Temperature`
--
ALTER TABLE `Temperature`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Oxidation`
--
ALTER TABLE `Oxidation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;


--
-- AUTO_INCREMENT for table `Respiration`
--
ALTER TABLE `Respiration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

  --
-- AUTO_INCREMENT for table `Respiration`
--
ALTER TABLE `Patient_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;



--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
