-- Create tables
CREATE TABLE input_storage (
    product_id serial PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    person_id INT REFERENCES people(person_id)
);

CREATE TABLE people (
    person_id serial PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);

-- Create sample data
-- Create users
DO $$ 
BEGIN
    FOR i IN 1..10 LOOP
        INSERT INTO people (name, email)
        VALUES ('Thanh ' || i, 'test' || i || '@gmail.com');
    END LOOP;
END $$;

--Create products
DO $$ 
BEGIN
    FOR i IN 1..10 LOOP
        INSERT INTO input_storage (name, quantity, person_id)
        VALUES ('Product ' || i, 10 + i, 10 - i + 1);
    END LOOP;
END $$;
