export class View {
   
    addPhotoButton = document.querySelector(".add-button");
    addPhotoForm = document.querySelector(".add-form");
    cancelPhotoAddingBtn = document.querySelector("input[value='Cancel']");
    gallery = document.querySelector(".gallery");
    labelInput = document.querySelector("#label");
    urlInput = document.querySelector("#url");
    column1 = document.querySelector(".column1");
    column2 = document.querySelector(".column2");
    column3 = document.querySelector(".column3");
    columnIndex = 1;

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

    renderImages(imagesData) {
        
        imagesData.forEach(imageData => {
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
            imageContainer.appendChild(deleteButton);
            
            let dynamicColumnName = "column";

            if (this.columnIndex > 3) {
                this.columnIndex = 1
            } 
            
            dynamicColumnName += this.columnIndex;
            
            const columnTofill = document.querySelector("." + dynamicColumnName);
            
            columnTofill.appendChild(imageContainer);
            
            this.columnIndex++;

            this.addHoverEffect(imageElement, labelElement, deleteButton);
        });
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