"use client";

import { useRef } from "react";
import classes from "./image-picker.module.css";

export default function ImagePicker({ label, displayName }) {

  const imageInput = useRef()

  function handleImageSelectorClick() { 
    imageInput.current.click();
  }

  return <div className={classes.picker}>
    <label htmlFor={displayName}>{label}</label>
    <div className="control">
      {/* note our classes.input css hides the default input */}
      <input className={classes.input} type="file" id={displayName} accept="image/png, image.jpeg" name={displayName} ref={imageInput} />
      <button className={classes.button} type="button" onClick={handleImageSelectorClick}>Choose an image</button>
    </div>
  </div>
}