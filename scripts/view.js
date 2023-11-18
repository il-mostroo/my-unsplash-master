export class View {
   
    initialise() {
        this.selectHtmlElements();
        this.addEventListeners();
    }

    selectHtmlElements() {
        this.addPhotoButton = document.querySelector(".add-button");
        this.addPhotoForm = document.querySelector(".add-form");
        this.cancelPhotoAddingBtn = document.querySelector("input[value='Cancel']");
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
}