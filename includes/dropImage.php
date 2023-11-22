<?php

$servername = "localhost";
$username = "root";
$password = "mariadbpassword";
$dbname = "gallery";

try {
    $urlToDrop = json_decode(file_get_contents("php://input"));

    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "DELETE FROM images WHERE url = :url";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':url', $urlToDrop, PDO::PARAM_STR);
    $stmt->execute();

} catch (PDOException) {
    http_response_code(400);
}
