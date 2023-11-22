import { View } from "./view.js";
import { Controller } from "./controller.js";

const addFormElement = document.querySelector('.add-form');
const labelInput = document.querySelector('#label');
const urlInput = document.querySelector('#url');
const gallery = document.querySelector(".gallery");

const view = new View();
const controller = new Controller();

view.initialise();
controller.initialise(gallery);
controller.addPhoto(addFormElement, labelInput, urlInput, gallery);