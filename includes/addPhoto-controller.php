<?php

require_once 'addPhoto-model.php';

class AddPhoto {
    
    public function getInputData() {
        $imageData = json_decode(file_get_contents("php://input"), true);
        return $imageData;
    }
    
    public function isInputEmpty($imageData) {
        if (empty($imageData["label"]) || empty($imageData["url"])) {
            return true;
        } else {
            return false;
        }
    }
    
    public function isUrlValid($imageData) {
        $bool = filter_var($imageData["url"], FILTER_VALIDATE_URL);
        if ($bool) {
            return true;
        } else {
            return false;
        }
    } 
}

$addPhoto = new AddPhoto();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    header('Content-Type: application/json');
    $imageData = $addPhoto->getInputData();
    if (!$imageData) {
        $response = ["message" => "Error uploading the image, please try again!"];
        echo json_encode($response);
        exit;
    }

    if ($addPhoto->isInputEmpty($imageData)) {
        http_response_code(400);
        $response = ["message" => "Please fill in all fields!"];
        echo json_encode($response);
        exit;
    } 

    if (!$addPhoto->isUrlValid($imageData)) {
        http_response_code(400);
        $response = ["message" => "Please enter a valid URL!"];
        echo json_encode($response);
        exit;
    }
    
    try {

        $model = new Model();
        $bool = $model->isImgAlreadyExists($imageData);
        if ($bool) {
            http_response_code(400);
            $response = ["message" => "Image already exists!"];
            echo json_encode($response);
            exit;
        }
    } catch (PDOException) {
        http_response_code(400);
        $response = ["message" => "Error uploading the image, please try again!"];
        echo json_encode($response);
        exit;
    }

    try {
        $model->insertImageData($imageData);
    } catch (PDOException) {
        http_response_code(400);
        $response = ["message" => "Error uploading the image, please try again!"];
        echo json_encode($response);
        exit;
    }

    http_response_code(200);
    $response = [$imageData];
    echo json_encode($response);
    
} else {
    $response = ["message" => "Invalid request method"];
    echo json_encode($response);
}




