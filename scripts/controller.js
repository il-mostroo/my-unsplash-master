export class Controller {
   
    getAddInputData(addFormElement, labelInput, urlInput) {
        addFormElement.addEventListener("submit", () => {
            const label = labelInput.value;
            const url = urlInput.value;
            let inputData = {label, url};
            return inputData;
        });
    }

    isInputEmpty({label, url}) {
        if (label.trim() === "" || url.trim() === "") {
            return true;
        } else {
            return false;
        }
    }

    isUrlValid(url) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(url);
      }
}