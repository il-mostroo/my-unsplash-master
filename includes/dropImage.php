<?php

require_once "dbh.php";

try {
    $urlToDrop = json_decode(file_get_contents("php://input"));

    $query = "DELETE FROM images WHERE url = :url";
    $stmt = connect()->prepare($query);
    $stmt->bindParam(':url', $urlToDrop, PDO::PARAM_STR);
    $stmt->execute();

} catch (PDOException) {
    http_response_code(400);
}
