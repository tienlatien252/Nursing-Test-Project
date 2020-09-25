CREATE TABLES IN POSTRESQL: 
    CREATE TABLE purchases (
	test_id BIGINT REFERENCES tests(test_id),
	expire_time TIMESTAMP,
    purchase_time TIMESTAMP,
    user_id TEXT
);
 CREATE TABLE questions (
     test_name TEXT,
     test_description TEXT,
     test_price BIGINT,
     test_id BIGINT REFERENCES tests(test_id)
);
CREATE TABLE tests (
	test_id BIGINT PRIMARY KEY,
    test_name TEXT,
    test_description TEXT,
    test_price BIGINT
);

 