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

    async handlePhotoAdding(addFormElement, labelInput, urlInput, gallery) {

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

    getUrlToDrop() {
        const images = document.querySelectorAll("img");
        images.forEach(image => {
            if (image.classList.contains("clicked")) {
                return image.src;
            }
        })
    }

    async deleteImage(urlToDrop) {
        const jsonData = JSON.stringify(urlToDrop);

        const response = await fetch("/my-unsplash-master/includes/dropImage.php", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: jsonData
        });
        if (!response.ok) {
            this.view.renderError("Error uplaoding the image, please try again!");
        } else {
            location.reload();
        }
    }

    handlePhotoDeleting(deletePhotoForm, passwordInput) {
        deletePhotoForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const password = passwordInput.value;
            if (password.trim() === "") {
                this.view.renderError("Please fill in the password!");
            } else if (!(password === "password")) {
                this.view.renderError("Password incorrect, please try again!");
                passwordInput.value = "";
            } else {
                const images = document.querySelectorAll("img");
                let urlToDrop = "";
                for (const image of images) {
                    if (image.classList.contains("clicked")) {
                        urlToDrop = image.src;
                        break;
                    }
                }
                this.deleteImage(urlToDrop);
            }
        })
    }
   
    renderImagesByFilter(filterInput, gallery) {
        
        const allImages = [];
        filterInput.addEventListener("input", (event) => {
            const filter = event.target.value;
            const imageContainers = document.querySelectorAll(".image-container");
            if (allImages.length === 0) {
                for (let imageContainer of imageContainers) {
                    const label = imageContainer.lastElementChild.textContent;
                    const url = imageContainer.firstElementChild.src;
                    allImages.push({label, url});
            }
            }
            const filteredImages = [];
            allImages.forEach(image => {
                if (image.label === filter) {
                    filteredImages.push(image);
                }
            })
            if (filteredImages.length > 0) {
                gallery.replaceChildren();
                this.view.renderImages(filteredImages, gallery);
            } else {
                gallery.replaceChildren();
                this.view.renderImages(allImages, gallery);
            }
        })
    }
}