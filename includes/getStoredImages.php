<?php

$servername = "localhost";
$username = "root";
$password = "mariadbpassword";
$dbname = "gallery";

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "SELECT label, url FROM images";
    $stmt = $pdo->query($query);

    $imagesData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($imagesData);

} catch (PDOException) {
    http_response_code(400);
}
