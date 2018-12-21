CREATE DATABASE `fhem` DEFAULT CHARACTER SET = `utf8`;

CREATE USER 'fhemuser'@'%' IDENTIFIED BY '2jRHnEi3WuNSQAcX7';

REVOKE CREATE ROUTINE, CREATE VIEW, CREATE USER, ALTER, SHOW VIEW, CREATE, ALTER ROUTINE, EVENT, SUPER, INSERT, RELOAD, SELECT, DELETE, FILE, SHOW DATABASES, TRIGGER, SHUTDOWN, REPLICATION CLIENT, GRANT OPTION, PROCESS, REFERENCES, UPDATE, DROP, REPLICATION SLAVE, EXECUTE, LOCK TABLES, CREATE TEMPORARY TABLES, INDEX ON *.* FROM 'fhemuser'@'%';

UPDATE mysql.user SET max_questions = 0, max_updates = 0, max_connections = 0 WHERE User = 'fhemuser';

GRANT CREATE ROUTINE, CREATE VIEW, ALTER, SHOW VIEW, CREATE, ALTER ROUTINE, EVENT, INSERT, SELECT, DELETE, TRIGGER, GRANT OPTION, REFERENCES, UPDATE, DROP, EXECUTE, LOCK TABLES, CREATE TEMPORARY TABLES, INDEX ON `fhem`.* TO 'fhemuser'@'%';

USE `fhem`;

CREATE TABLE history (
    TIMESTAMP TIMESTAMP,
    DEVICE varchar(64),
    TYPE varchar(64),
    EVENT varchar(512),
    READING varchar(64),
    VALUE varchar(255),
    UNIT varchar(32),
    KEY `IDX_HISTORY` (`DEVICE`,`READING`,`TIMESTAMP`,`VALUE`),
    KEY `IDX_DEVICE` (`DEVICE`,`READING`),
    KEY `IDX_REPORT` (`TIMESTAMP`,`READING`) USING BTREE
);

CREATE TABLE current (
    TIMESTAMP TIMESTAMP,
    DEVICE varchar(64),
    TYPE varchar(64),
    EVENT varchar(512),
    READING varchar(64),
    VALUE varchar(255),
    UNIT varchar(32)
);

FLUSH PRIVILEGES;
