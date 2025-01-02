import classes from "./image-picker.module.css";

export default function ImagePicker({ label, displayName }) {
  return <div className={classes.picker}>
    <label htmlFor={displayName}>{label}</label>
    <div className="control">
      <input type="file" id={displayName} accept="image/png, image.jpeg" name={displayName} />
    </div>
  </div>
}