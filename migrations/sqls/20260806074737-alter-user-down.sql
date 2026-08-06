ALTER TABLE Users DROP COLUMN otp;

ALTER TABLE Users DROP COLUMN user_type;

ALTER TABLE Users DROP COLUMN otp_expiry_time;

DROP TYPE UserType;
