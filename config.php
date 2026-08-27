<?php

$DB_HOST = "localhost";
$DB_USER = "root";
$DB_PASS = "";
$DB_NAME = "npad";

// Establish a connection
$conn = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS);

if(!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

// Create if not exist DB
mysqli_query($conn, "CREATE DATABASE IF NOT EXISTS $DB_NAME");
// Connect to the created/existing DB
mysqli_select_db($conn, $DB_NAME);

$schema = "
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
";

// Create the users and notes schema tables
if(mysqli_multi_query($conn, $schema)) {
    do {
        if ($result = mysqli_store_result($conn)) {
            mysqli_free_result($result);
        }
    } while (mysqli_more_results($conn) && mysqli_next_result($conn));
}
else {
    die("Schema setup failed: " . mysqli_error($conn));
}