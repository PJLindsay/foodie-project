"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  const imageInput = useRef();
  const [selectedImage, setSelectedImage] = useState(null);

  function handleImageSelectorClick() {
    imageInput.current.click();
  }

  function handleImageSelectionChange(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setSelectedImage(null);
      return;
    }

    //convert to a data url for an image preview source
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setSelectedImage(fileReader.result);
    };

    fileReader.readAsDataURL(selectedFile);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className="control">
        <div className={classes.preview}>
          {!selectedImage && <p>No image selected yet...</p>}
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="The image selected by the user"
              fill
            />
          )}
        </div>
        {/* note our classes.input css hides the default input*/}
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageSelectionChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleImageSelectorClick}
        >
          Choose an image
        </button>
      </div>
    </div>
  );
}
