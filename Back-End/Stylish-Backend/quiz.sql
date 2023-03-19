CREATE TABLE `quiz` (
  `user_id` bigint unsigned NOT NULL,
  `q1` varchar(3),
  `q2` varchar(3) ,
  `q3` varchar(3),
  `q4` varchar(3) ,
  `q5` varchar(3) ,
  PRIMARY KEY (`user_id`)
)