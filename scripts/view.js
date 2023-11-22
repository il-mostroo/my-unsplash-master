export class View {

    initialise() {
        this.selectHtmlElements();
        this.addEventListeners();
    }
    
    selectHtmlElements() {
        this.addPhotoButton = document.querySelector(".add-button");
        this.addPhotoForm = document.querySelector(".add-form");
        this.cancelPhotoAddingBtn = document.querySelector(".cancel-adding");
        this.cancelPhotoDeletingBtn = document.querySelector(".cancel-deleting");
        this.deletePhotoForm = document.querySelector(".delete-form");
    }

    addEventListeners() {
        this.addPhotoButton.addEventListener("click", () => {
            console.log(this)
            this.addPhotoForm.style.display = "flex";
        })
        
        this.cancelPhotoAddingBtn.addEventListener("click", () => {
            this.addPhotoForm.style.display = "none";
        })

        this.cancelPhotoDeletingBtn.addEventListener("click", () => {
            this.deletePhotoForm.style.display = "none";
        })
    }

    renderError(error) {
        const toastDiv = document.createElement('div');
        toastDiv.id = 'toast';
        const errorParagraph = document.createElement('p');
        errorParagraph.textContent = error;
        toastDiv.appendChild(errorParagraph);
        document.body.appendChild(toastDiv);
        setTimeout(() => {
            toastDiv.remove();
          }, 3000);          
    }

    createImageContainer(imageData) {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        
        const imageElement = document.createElement("img");
        imageElement.classList.add("image-item");
        imageElement.src = imageData.url;
        imageContainer.appendChild(imageElement);
        
        const labelElement = document.createElement("p");
        labelElement.classList.add("image-label");
        labelElement.textContent = imageData.label;
        imageContainer.appendChild(labelElement);
        
        const deletePhotoForm = document.querySelector(".delete-form");

        const deleteButton = document.createElement("input");
        deleteButton.classList.add("delete-button", "button");
        deleteButton.type = "button";
        deleteButton.value = "Delete";
        deleteButton.addEventListener("click", () => {
            deletePhotoForm.style.display = "flex";
            this.trackImageToDelete(deleteButton);
        })
        imageContainer.appendChild(deleteButton);
        
        this.addHoverEffect(imageElement, labelElement, deleteButton);
        return imageContainer;
    }

    trackImageToDelete(clickedDeleteButton) {
        const imageContainer = clickedDeleteButton.closest(".image-container");
        const imageToDelete = imageContainer.querySelector("img");
        const images = document.querySelectorAll("img");
        images.forEach(image => {
            if (image.classList.contains("clicked")) {
                image.classList.remove("clicked");
            }
        })
        imageToDelete.classList.add("clicked");
    }

    renderImages(imagesData, gallery) {
        imagesData.forEach(imageData => {
           const imageContainer = this.createImageContainer(imageData);
           gallery.appendChild(imageContainer);
        });
    }

    renderAddedImage(imageData, gallery) {
        const imageContainer = this.createImageContainer(imageData[0]);
        gallery.insertBefore(imageContainer, gallery.firstChild);
    }

    addHoverEffect(imageElement, labelElement, deleteButton) {
        imageElement.addEventListener("mouseenter", () => {
            labelElement.classList.add("show");
            deleteButton.classList.add("show");
        })

        imageElement.addEventListener("mouseleave", (event) => {
            if(!this.isMouseOverElement(event, deleteButton) && !this.isMouseOverElement(event, labelElement)) {
                labelElement.classList.remove("show");
                deleteButton.classList.remove("show");
            }
        })
    }

    isMouseOverElement(event, element) {
        const rect = element.getBoundingClientRect();
        return (
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
        );
    }
}