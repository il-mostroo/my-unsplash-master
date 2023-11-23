<?php

require_once 'Dbh.php';

class DropImage extends Dbh {
    public function dropImage() {
        try {
            $urlToDrop = json_decode(file_get_contents("php://input"));
        
            $query = "DELETE FROM images WHERE url = :url";
            $stmt = parent::connect()->prepare($query);
            $stmt->bindParam(':url', $urlToDrop, PDO::PARAM_STR);
            $stmt->execute();
        
        } catch (PDOException) {
            http_response_code(400);
        }
    }
}
$dropImgInstance = new DropImage();
$dropImgInstance->dropImage();


