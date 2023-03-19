
CREATE TABLE `liked_product` (
  `user_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
   FOREIGN KEY (user_id) REFERENCES USER(id),
   FOREIGN KEY (product_id) REFERENCES product(id)
)

CREATE TABLE `subscription`(
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `plan` varchar(15) NOT NULL, 
  `price` varchar(15),
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `expire` date,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`id`)
)
-- when subscribed, calculated expire date and save into table

INSERT INTO subscription (user_id, plan, price) VALUES (10254, "premium", 4.99)

