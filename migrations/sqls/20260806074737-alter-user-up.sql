
CREATE TYPE UserType AS ENUM('admin','seller','buyer');


ALTER TABLE Users
ADD  otp INTEGER NULL;

ALTER TABLE Users
ADD  user_type UserType NULL;

ALTER TABLE Users
ADD otp_expiry_time TIMESTAMPTZ NULL;
