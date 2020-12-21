DROP DATABASE IF EXISTS kabouts;
CREATE DATABASE kabouts;
USE kabouts;

CREATE TABLE items (
  id int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  info TEXT,
  photo TEXT,
  block_id INT
);

CREATE TABLE locations (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  loc_name TEXT,
  size_x INT NOT NULL DEFAULT 10,
  size_y INT NOT NULL DEFAULT 10
);

CREATE TABLE blocks (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  lvl INT NOT NULL DEFAULT 0,
  x INT NOT NULL,
  y INT NOT NULL,
  loc_id INT
);

ALTER TABLE items ADD FOREIGN KEY fk_items_blocks (block_id) REFERENCES blocks (id) ON DELETE CASCADE;
ALTER TABLE blocks ADD FOREIGN KEY fk_blocks_locations (loc_id) REFERENCES locations (id) ON DELETE CASCADE;

CREATE INDEX items_block_id ON items (block_id);
CREATE INDEX blocks_loc_id ON blocks (loc_id);