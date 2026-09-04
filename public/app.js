const imageInput = document.getElementById("image-input");
const selectImageButton = document.getElementById("select-image");

const previewArea = document.getElementById("preview-area");
const imagePreview = document.getElementById("image-preview");
const upscaleButton = document.getElementById("upscale-button");

const privacyPopup = document.getElementById("privacy-popup");
const privacyContinue = document.getElementById("privacy-continue");

let selectedImage = null;

/* --------------------------------------------------
   PRIVACY
-------------------------------------------------- */

privacyContinue.addEventListener("click", () => {
  privacyPopup.hidden = true;
});

/* --------------------------------------------------
   IMAGE SELECTION
-------------------------------------------------- */

selectImageButton.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];

  if (!file || !file.type.startsWith("image/")) {
    return;
  }

  selectedImage = file;

  const imageURL = URL.createObjectURL(file);

  imagePreview.onload = () => {
    URL.revokeObjectURL(imageURL);
  };

  imagePreview.src = imageURL;
  previewArea.hidden = false;

  selectImageButton.textContent = "Choose another image";
});

/* --------------------------------------------------
   UPSCALE
-------------------------------------------------- */

upscaleButton.addEventListener("click", async () => {
  if (!selectedImage) {
    return;
  }

  upscaleButton.disabled = true;
  upscaleButton.textContent = "Processing...";

  try {
    /*
     * The actual Lanczos / bicubic processing will be
     * connected here later.
     *
     * We deliberately keep the UI logic separate from
     * the mathematical image-processing implementation.
     */

    await new Promise((resolve) => setTimeout(resolve, 300));

    console.log("Ready for image processing:", selectedImage.name);
  } catch (error) {
    console.error("Upscaling failed:", error);
  } finally {
    upscaleButton.disabled = false;
    upscaleButton.textContent = "Upscale image";
  }
});
