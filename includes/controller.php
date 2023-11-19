<?php

header('Content-Type: application/json');

include 'model.php';

class Controller {

    function checkRequestMethod () {
        if (!$_SERVER["REQUEST_METHOD"] === "POST") {
            $response = ["message" => "Invalid request method"];
            echo json_encode($response);
            exit;
        } else {
            $this->getAddInputData();
        }
    }

    function getAddInputData() {
        $jsonData = json_decode(file_get_contents("php://input"), true);
        if (!$jsonData) {
            $response = ["message" => "Invalid JSON data"];
            echo json_encode($response);
            exit;
        } else {
            $this->isInputEmpty($jsonData);
        }
    }

    function isInputEmpty($jsonData) {
        $dataObject = json_decode($jsonData);
        if (empty($dataObject->label) || empty($dataObject->url)) {
            $response = ["message" => "Fill in all fields!"];
            echo json_encode($response);
            exit;
        } else {
            $this->isUrlValid($jsonData);
        }
    }

    function isUrlValid($jsonData) {
        $dataObject = json_decode($jsonData);
        if (filter_var($dataObject->url, FILTER_VALIDATE_URL) === false) {
            $response = ["message" => "Please enter a valid URL!"];
            echo json_encode($response);
            exit;
        } else {
            $model = new Model();
            $model->setImgData($jsonData);
        }
    }
}
