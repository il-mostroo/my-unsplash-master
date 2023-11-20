<?php  

function connect() {
    $host = "localhost";
    $dbname = "gallery";
    $dbusername = "root";
    $dbpassword = "mariadbpassword";

    $pdo = new PDO('mysql:host=' . $host . ";dbname=" . $dbname, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
}
