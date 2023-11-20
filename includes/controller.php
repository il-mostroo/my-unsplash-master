<?php

require_once "model.php";

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    getAddInputData();
} else {
    $response = ["message" => "Invalid request method"];
    echo json_encode($response);
}

function getAddInputData() {
    $imageData = json_decode(file_get_contents("php://input"), true);
    if (!$imageData) {
        $response = ["message" => "Invalid JSON data"];
        echo json_encode($response);
        exit;
    } else {
        isInputEmpty($imageData);
    }
}

function isInputEmpty($imageData) {
    if (empty($imageData["label"]) || empty($imageData["url"])) {
        $response = ["message" => "Fill in all fields!"];
        echo json_encode($response);
        exit;
    } else {
        isUrlValid($imageData);
    }
}

function isUrlValid($imageData) {
    $bool = filter_var($imageData["url"], FILTER_VALIDATE_URL);
    if (!$bool) {
        $response = ["message" => "Please enter a valid URL!"];
        echo json_encode($response);
        exit;  
    } else {
        insertImageData($imageData);
    }
} 
