CREATE TABLE Contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL
);

INSERT INTO Contacts (name, email, contact)
VALUES
('John Doe', 'johndoe@example.com', '+1234567890'),
('Jane Smith', 'janesmith@example.com', '+9876543210'),
('Mike Johnson', 'mikejohnson@example.com', '+5555555555'),
('Alice Brown', 'alicebrown@example.com', '+1111111111'),
('Bob Wilson', 'bobwilson@example.com', '+2222222222'),
('Emily Davis', 'emilydavis@example.com', '+3333333333'),
('Tom Thompson', 'tomthompson@example.com', '+4444444444'),
('Sara Miller', 'saramiller@example.com', '+5555555555'),
('David Anderson', 'davidanderson@example.com', '+6666666666'),
('Olivia Rodriguez', 'oliviarodriguez@example.com', '+7777777777'),
('Daniel Lee', 'daniellee@example.com', '+8888888888'),
('Sophia Martinez', 'sophiamartinez@example.com', '+9999999999'),
('James Taylor', 'jamestaylor@example.com', '+1010101010'),
('Emma Clark', 'emmaclark@example.com', '+1212121212'),
('Michael Wright', 'michaelwright@example.com', '+1313131313'),
('Lily Hall', 'lilyhall@example.com', '+1414141414'),
('William Baker', 'williambaker@example.com', '+1515151515'),
('Ava Mitchell', 'avamitchell@example.com', '+1616161616'),
('Henry Green', 'henrygreen@example.com', '+1717171717'),
('Grace Young', 'graceyoung@example.com', '+1818181818');

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

FLUSH PRIVILEGES;

