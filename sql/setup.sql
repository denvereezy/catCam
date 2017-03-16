CREATE DATABASE catCam;
CREATE USER admin@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON catCam.* TO admin@localhost;
FLUSH PRIVILEGES;

use catCam;

create table pics (
  id int not null primary key auto_increment,
  filename varchar(100) not null,
  exit_code varchar(100),
  time_stamp varchar(100)
);
