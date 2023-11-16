const addPhotoButton = document.querySelector(".add-button");
const addPhotoForm = document.querySelector(".add-form");
const cancelPhotoAddingBtn = document.querySelector("input[value='Cancel']");

addPhotoButton.addEventListener("click", () => {
    addPhotoForm.style.display = "flex";
})

cancelPhotoAddingBtn.addEventListener("click", () => {
    addPhotoForm.style.display = "none";
})