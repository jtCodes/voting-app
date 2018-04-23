
/*****************************************
* Create voting app database
*****************************************/
DROP DATABASE IF EXISTS anonvotedb;
CREATE DATABASE anonvotedb;
\c anonvotedb
-- PostgresSQL command
CREATE TABLE poll
(
    pid SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    who INT,
    date_created TIMESTAMP
);
CREATE TABLE poll_option
(
    oid SERIAL PRIMARY KEY,
    pid INT REFERENCES poll(pid),
    option VARCHAR NOT NULL,
    option_num INT NOT NULL
);
CREATE TABLE vote
(
    oid INT NOT NULL,
    pid INT NOT NULL,
    uid INT,
    date_created TIMESTAMP
);