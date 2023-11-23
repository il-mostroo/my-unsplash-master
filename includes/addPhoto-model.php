<?php

require_once 'Dbh.php';
class Model extends Dbh {

    public function isImgAlreadyExists($imageData) {
        $query = "SELECT COUNT(*) FROM images WHERE url = :url;";
            $stmt = parent::connect()->prepare($query);
            $stmt->bindParam(":url", $imageData["url"]);
            $stmt->execute();
            $result = $stmt->fetchColumn();

            return $result > 0;
    }
    
    public function insertImageData($imageData) {
        $query = "INSERT INTO images (`label`, `url`) VALUES (:label, :url);";
        $stmt = parent::connect()->prepare($query);
        $stmt->bindParam(":label", $imageData["label"]);
        $stmt->bindParam(":url", $imageData["url"]);
        $stmt->execute();
    }
}



