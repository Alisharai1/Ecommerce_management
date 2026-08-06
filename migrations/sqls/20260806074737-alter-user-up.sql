
CREATE TYPE UserType AS ENUM('admin','seller','buyer');


ALTER TABLE Users
ADD  otp INTEGER;

ALTER TABLE Users
ADD  user_type UserType;