<?php

require_once "dbh.php";

try {
    $query = "SELECT label, url FROM images";
    $stmt = connect()->query($query);

    $imagesData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($imagesData);

} catch (PDOException) {
    http_response_code(400);
}
