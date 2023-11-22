import { View } from "./view.js";

export class Controller {
    
    initialise(gallery) {
        this.view = new View();
        this.renderStoredImages(gallery);
    }

    async getStoredImages() {
          const response = await fetch('/my-unsplash-master/includes/getStoredImages.php');
          if (response.ok) {
              const imagesData = await response.json();
              return imagesData;
            } else {
              location.reload();
          }
      }

    async renderStoredImages(gallery) {
            try {
                const storedImagesData = await this.getStoredImages();
                this.view.renderImages(storedImagesData, gallery);
            } catch(error) {
                location.reload();
            }
    }

    isInputEmpty(inputData) {
        if (inputData.label.trim() === "" || inputData.url.trim() === "") {
            return true;
        } else {
            return false;
        }
    }

    isUrlValid(inputData) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        if (urlRegex.test(inputData.url)) {
            return true;
        } else {
            return false;
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
        return data;
    }

    async addPhoto(addFormElement, labelInput, urlInput, gallery) {

        addFormElement.addEventListener("submit", async (event) => {
            event.preventDefault();
            const label = labelInput.value;
            const url = urlInput.value;
            const inputData = {label, url};

            if (this.isInputEmpty(inputData)) {
                this.view.renderError("Please fill in all fields!");
                return;
            }
    
            if (this.isUrlValid(inputData.url)) {
                this.view.renderError("Please enter a valid URL!");
                return;
            }
    
            const data = await this.sendDataToServer(inputData);
            if (data.message) {
                this.view.renderError(data.message);
            } else {
                this.view.renderAddedImage(data, gallery);
                addFormElement.style.display = "none";
            }
        });
    }
}