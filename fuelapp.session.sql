-- @block
SELECT * FROM user_credentials;

-- @block
INSERT INTO user_credentials (username, password) VALUES ('testuser', 'hashedpassword1@');

-- @block
SELECT * FROM client_information;
