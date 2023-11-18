import { View } from "./view.js";
import { Controller } from "./controller.js";

const addFormElement = document.querySelector('.add-form');
const labelInput = document.querySelector('#label');
const urlInput = document.querySelector('#url');

const view = new View();
const controller = new Controller();

view.initialise();

const inputData = controller.getAddInputData(addFormElement, labelInput, urlInput);

if (controller.isInputEmpty(inputData)) {
    view.renderError("Fill in all fields!");
} else if (!(controller.isUrlValid(inputData.url))) {
    view.renderError("Please enter a valid URL!");
} else {
    controller.sendDataToServer();
}
