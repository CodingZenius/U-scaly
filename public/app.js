document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("image-input");
  const selectImageButton = document.getElementById("select-image");

  const previewArea = document.getElementById("preview-area");
  const imagePreview = document.getElementById("image-preview");
  const upscaleButton = document.getElementById("upscale-button");

  const privacyPopup = document.getElementById("privacy-popup");
  const privacyContinue = document.getElementById("privacy-continue");

  if (!privacyPopup || !privacyContinue) {
    console.error("U-scaly: Privacy elements not found.");
    return;
  }

  let selectedImage = null;

  /* --------------------------------------------------
     PRIVACY
  -------------------------------------------------- */

  privacyContinue.addEventListener("click", () => {
    privacyPopup.style.display = "none";
    privacyPopup.setAttribute("aria-hidden", "true");
  });

  /* --------------------------------------------------
     IMAGE SELECTION
  -------------------------------------------------- */

  if (selectImageButton && imageInput) {
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

      if (imagePreview) {
        imagePreview.onload = () => {
          URL.revokeObjectURL(imageURL);
        };

        imagePreview.src = imageURL;
      }

      if (previewArea) {
        previewArea.hidden = false;
      }

      selectImageButton.textContent = "Choose another image";
    });
  }

  /* --------------------------------------------------
     UPSCALE
  -------------------------------------------------- */

  if (upscaleButton) {
    upscaleButton.addEventListener("click", async () => {
      if (!selectedImage) {
        return;
      }

      upscaleButton.disabled = true;
      upscaleButton.textContent = "Processing...";

      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        console.log(
          "Ready for image processing:",
          selectedImage.name
        );
      } catch (error) {
        console.error("Upscaling failed:", error);
      } finally {
        upscaleButton.disabled = false;
        upscaleButton.textContent = "Upscale image";
      }
    });
  }
});
