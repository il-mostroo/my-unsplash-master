export class View {
   
    addPhotoButton = document.querySelector(".add-button");
    addPhotoForm = document.querySelector(".add-form");
    cancelPhotoAddingBtn = document.querySelector("input[value='Cancel']");
    gallery = document.querySelector(".gallery");
    labelInput = document.querySelector("#label");
    urlInput = document.querySelector("#url");

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
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        this.gallery.appendChild(imageContainer);
    
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
        this.labelInput.value = "";
        this.urlInput.value = "";
        
        this.addHoverEffect(imageElement, labelElement, deleteButton);
    }

    addHoverEffect(imageElement, labelElement, deleteButton) {
        imageElement.addEventListener("mouseover", () => {
            labelElement.classList.add("show");
            deleteButton.classList.add("show");
        })

        imageElement.addEventListener("mouseout", () => {
            labelElement.classList.remove("show");
            deleteButton.classList.remove("show");
        })
    }
}