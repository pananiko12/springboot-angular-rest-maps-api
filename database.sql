-- We create the Database-- 
CREATE DATABASE citedb;

-- We select the database 
USE citedb;

--  We create Table called Employee
CREATE TABLE Employee(
EMP_ID BIGINT AUTO_INCREMENT PRIMARY KEY,
EMP_Name VARCHAR(100) NOT NULL,
EMP_DateOfBirth DATE NOT NULL,
EMP_Address VARCHAR(200)  NOT NULL,
EMP_City VARCHAR(50) NOT NULL,
EMP_CarOwned BOOLEAN
);

-- Add data on Employee 
INSERT INTO Employee(EMP_Name,EMP_DateOfBirth,EMP_Address,EMP_City,EMP_CarOwned)
VALUES('panos','1995-7-04','Panepistimiou 100','Athens',TRUE),
('Konstantinos','1993-7-04','Stadiou 10 ','Athens',FALSE),
('Giannis','1985-7-04','Papandreou ','Peireas',TRUE),
('Giorgos','1965-7-04','random','Korydallos',FALSE),
('Maria','1992-7-04','Papandreou','Nea smyrni',TRUE);

-- We create table Attribute
CREATE TABLE Attribute(
ATTR_ID INT AUTO_INCREMENT PRIMARY KEY,
ATTR_Name VARCHAR(50) NOT NULL,
ATTR_Value VARCHAR(50) 
);

-- We add data on Attribute
INSERT INTO Attribute(ATTR_Name,ATTR_Value)
VALUES('Adaptable', '1'),
('Ambitious', 'val2'),
('Original', 'test value 3'),
('Professional', 'test value 3'),
('Productive', 'test value 3'),
('Thoughtful', 'test value 3');

-- We create the EmployeeAttribute table that has a foreign key from both tables
CREATE TABLE EmployeeAttribute(
employee_id BIGINT  NOT NULL,
attribute_id INT  NOT NULL,
PRIMARY KEY(employee_id,attribute_id),
CONSTRAINT empattrfk1 FOREIGN KEY (employee_id) REFERENCES Employee(EMP_ID),
CONSTRAINT empattrfk2 FOREIGN KEY (attribute_id) REFERENCES Attribute(ATTR_ID)
);

-- We add data in employeeAttribute
INSERT INTO EmployeeAttribute (employee_id,attribute_id)
VALUES (1,1),
(1,2),
(2,1),
(3,2),
(3,3),
(4,2),
(4,1);
 
