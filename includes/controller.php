<?php

require_once "model.php";

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $imageData = getAddInputData();

    if (!$imageData) {
        $response = ["message" => "Error uplading the image, please try again!"];
        echo json_encode($response);
        exit;
    }

    if (isInputEmpty($imageData)) {
        http_response_code(400);
        $response = ["message" => "Please fill in all fields!"];
        echo json_encode($response);
        exit;
    } 

    if (!isUrlValid($imageData)) {
        http_response_code(400);
        $response = ["message" => "Please enter a valid URL!"];
        echo json_encode($response);
        exit;
    }
    
    try {
        $bool = isImgAlreadyExists($imageData);
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
        insertImageData($imageData);
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

function getAddInputData() {
    $imageData = json_decode(file_get_contents("php://input"), true);
    return $imageData;
}

function isInputEmpty($imageData) {
    if (empty($imageData["label"]) || empty($imageData["url"])) {
        return true;
    } else {
        return false;
    }
}

function isUrlValid($imageData) {
    $bool = filter_var($imageData["url"], FILTER_VALIDATE_URL);
    if ($bool) {
        return true;
    } else {
        return false;
    }
} 

