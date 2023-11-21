import { View } from "./view.js";

export class Controller {

    addPhotoForm = document.querySelector(".add-form");

    constructor() {
        this.view = new View();
    }

    initialise(addFormElement, labelInput, urlInput) {
        // const storedImagesData = this.getStoredImages();
        // this.view.renderImages(storedImagesData);
        this.getAddInputData(addFormElement, labelInput, urlInput);
    }

    // getStoredImages() {
    //     document.addEventListener('DOMContentLoaded', () => {
    //         fetch('path/to/your/php/script.php')
    //             .then(response => response.json())
    //             .then(images => {
    //                 return images;
    //             })
    //             .catch(error => console.error('Error fetching images:', error));
    //     });
    // }

    getAddInputData(addFormElement, labelInput, urlInput) {
        addFormElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const label = labelInput.value;
            const url = urlInput.value;
            let inputData = {label, url};
            this.isInputEmpty(inputData);
        });
    }

    isInputEmpty(inputData) {
        if (inputData.label.trim() === "" || inputData.url.trim() === "") {
            this.view.renderError("Fill in all fields!");
        } else {
            this.isUrlValid(inputData);
        }
    }

    isUrlValid(inputData) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        if (!urlRegex.test(inputData.url)) {
            this.view.renderError("Please enter a valid URL!");
        } else {
            this.sendDataToServer(inputData);
        }
    }

    async sendDataToServer(inputData) {
        const jsonData = JSON.stringify(inputData);

        const response = await fetch("/my-unsplash-master/includes/controller.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: jsonData
        });
        const data = await response.json();
        if (data.message) {
            this.view.renderError(data.message);
        } else {
            this.view.renderImages(data);
            this.addPhotoForm.style.display = "none";
        }
    }
}