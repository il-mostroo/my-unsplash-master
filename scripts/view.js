export class View {
   
    addPhotoButton = document.querySelector(".add-button");
    addPhotoForm = document.querySelector(".add-form");
    cancelPhotoAddingBtn = document.querySelector(".cancel-adding");
    cancelPhotoDeletingBtn = document.querySelector(".cancel-deleting");
    gallery = document.querySelector(".gallery");
    labelInput = document.querySelector("#label");
    urlInput = document.querySelector("#url");
    deletePhotoForm = document.querySelector(".delete-form");

    initialise() {
        this.addEventListeners();
    }

    addEventListeners() {
        this.addPhotoButton.addEventListener("click", () => {
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
    
        const deleteButton = document.createElement("input");
        deleteButton.classList.add("delete-button", "button");
        deleteButton.type = "button";
        deleteButton.value = "Delete";
        deleteButton.addEventListener("click", () => {
            this.deletePhotoForm.style.display = "flex";
        })
        imageContainer.appendChild(deleteButton);
        this.gallery.appendChild(imageContainer);

        this.addHoverEffect(imageElement, labelElement, deleteButton);
    }

    renderStoredImages(imagesData) {
        imagesData.forEach(imageData => {
           this.createImageContainer(imageData);
        });
    }

    renderAddedImage(imageData) {
        this.createImageContainer(imageData);
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