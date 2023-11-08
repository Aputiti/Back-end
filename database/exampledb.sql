DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

-- Create Users table
CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

-- Create MediaItems table
CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Comments table
CREATE TABLE Comments (
  comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  media_id INT NOT NULL,
  comment_text VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id)
);

-- Create FollowSystem table
CREATE TABLE FollowSystem (
  follow_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  follower_id INT NOT NULL,
  following_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (follower_id) REFERENCES Users(user_id),
  FOREIGN KEY (following_id) REFERENCES Users(user_id)
);


-- add users
INSERT INTO Users 
  VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users 
  VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);
INSERT INTO Users
  VALUES (420, 'GameMaster', 'secret345', 'game@example.com', 1, null);

-- add media items
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg', null),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg', null),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg', null),
         ('dsf7.mp4', 68547974, 'Pranks', null, 260, 'video/mp4', null);

-- add comments
INSERT INTO Comments (user_id, media_id, comment_text, created_at)
  VALUES (420, 2, 'Looking fresh!', null),
         (305, 3, 'You forgot me :(', null);

-- add follws
INSERT INTO FollowSystem (follower_id, following_id, created_at)
  VALUES (420, 260, null),
         (420, 305, null);


-- update profile information
UPDATE Users
SET username = 'NewUsername', email = 'newemail@example.com'
WHERE user_id = 260;

-- upload new media item 
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at)
VALUES ('newfile.jpg', 12345, 'New Photo', 'My New Photo', 305, 'image/jpeg', NOW());

-- delete a comment 
DELETE FROM Comments
WHERE comment_id = 1;

-- check out user's media items
SELECT * FROM MediaItems
WHERE user_id = 260;

-- see all comments on a media item
SELECT * FROM Comments
WHERE media_id = 3;
