<?php

$host = 'localhost';
$dbname = 'gallery';
$dbusername = 'root';
$dbpassword = 'mariadbpassword'; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOexception $e) {
    die("Connection failed:" . $e->getMessage());
}