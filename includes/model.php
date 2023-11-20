<?php

require_once "dbh.php";

function insertImageData($imageData) {
    try {
        $query = "INSERT INTO images (`label`, `url`) VALUES (:label, :url);";
        $stmt = connect()->prepare($query);
        $stmt->bindParam(":label", $imageData["label"]);
        $stmt->bindParam(":url", $imageData["url"]);
        $stmt->execute();

    } catch (Exception) {
        $response = ["message" => "Error uploading the image, please try again!"];
        echo json_encode($response);
    }
}
