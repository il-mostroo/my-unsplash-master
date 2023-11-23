<?php

require_once 'Dbh.php';

class GetStoredImages extends Dbh {
    public function getStoredImages() {
        try {
            $query = "SELECT label, url FROM images";
            $stmt = parent::connect()->query($query);
        
            $imagesData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            header('Content-Type: application/json');
            echo json_encode($imagesData);
        
        } catch (PDOException) {
            http_response_code(400);
        }
    }
}
$getStoredImages = new GetStoredImages();
$getStoredImages->getStoredImages();