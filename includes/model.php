<?php

require_once "dbh.php";

function isImgAlreadyExists($imageData) {
            $query = "SELECT COUNT(*) FROM images WHERE url = :url;";
            $stmt = connect()->prepare($query);
            $stmt->bindParam(":url", $imageData["url"]);
            $stmt->execute();

            $result = $stmt->fetchColumn();

            return $result > 0;
}

function insertImageData($imageData) {
        $query = "INSERT INTO images (`label`, `url`) VALUES (:label, :url);";
        $stmt = connect()->prepare($query);
        $stmt->bindParam(":label", $imageData["label"]);
        $stmt->bindParam(":url", $imageData["url"]);
        $stmt->execute();
}


