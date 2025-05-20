CREATE DATABASE lab16;

\c lab16

CREATE TABLE lab_table (
    id SERIAL PRIMARY KEY,
    name TEXT,
    value TEXT
);

INSERT INTO lab_table (name, value)
VALUES ('Test Name', 'Test Value');

SELECT * FROM lab_table;