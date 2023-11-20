export class View {
   
    initialise() {
        this.selectHtmlElements();
        this.addEventListeners();
    }

    selectHtmlElements() {
        this.addPhotoButton = document.querySelector(".add-button");
        this.addPhotoForm = document.querySelector(".add-form");
        this.cancelPhotoAddingBtn = document.querySelector("input[value='Cancel']");
        this.gallery = document.querySelector(".gallery");
    }

    addEventListeners() {
        this.addPhotoButton.addEventListener("click", () => {
            this.addPhotoForm.style.display = "flex";
        })
        
        this.cancelPhotoAddingBtn.addEventListener("click", () => {
            this.addPhotoForm.style.display = "none";
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

    renderImage(imageData) {
        const gallery = document.querySelector(".gallery");
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        gallery.appendChild(imageContainer);

        const imageElement = document.createElement("img");
        imageElement.classList.add("image-item");
        imageElement.src = imageData.url;
        imageContainer.appendChild(imageElement);

        const labelElement = document.createElement("p");
        labelElement.classList.add("image-label");
        labelElement.textContent = imageData.label;
        imageContainer.appendChild(labelElement);

        const deleteButton = document.createElement("input");
        deleteButton.classList.add("delete-button");
        deleteButton.type = "button";
        deleteButton.value = "Delete";
        imageContainer.appendChild(deleteButton);

        const addPhotoForm = document.querySelector(".add-form");
        addPhotoForm.style.display = "none";
    }
}