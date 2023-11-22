import { View } from "./view.js";
import { Controller } from "./controller.js";

const addFormElement = document.querySelector('.add-form');
const labelInput = document.querySelector('#label');
const urlInput = document.querySelector('#url');
const gallery = document.querySelector(".gallery");
const deleteForm = document.querySelector(".delete-form");
const passwordInput = document.querySelector("#password");

const view = new View();
const controller = new Controller();

view.initialise();
controller.initialise(gallery);
controller.handlePhotoAdding(addFormElement, labelInput, urlInput, gallery);
controller.handlePhotoDeleting(deleteForm, passwordInput);