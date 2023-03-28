import { Button } from "@mui/material";
import React, { useRef } from "react";
import styles from "./ImageChanger.module.scss";

interface ImageChangerProps {
  imgFile: File | undefined;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width: number;
  height: number;
  title: string;
}

const ImageChanger: React.FC<ImageChangerProps> = ({
  changeHandler,
  imgFile,
  width,
  height,
  title,
}) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const pickHandler = () => {
    if (!imageRef.current?.files) return;
    imageRef.current.click();
  };

  return (
    <div style={{ height: "max-content" }}>
      <Button
        size="small"
        variant="contained"
        onClick={pickHandler}
        style={{ width: "fit-content" }}
      >
        {title}
      </Button>
      <input
        className={styles.hiden}
        name={title}
        type="file"
        ref={imageRef}
        onChange={changeHandler}
        accept="image/png, image/jpeg"
      />
      {imgFile && (
        <div
          className={styles.Image}
          style={{ maxWidth: width + "px", maxHeight: height + "px" }}
        >
          <img src={URL.createObjectURL(imgFile)} alt="TechnicImage" />
        </div>
      )}
    </div>
  );
};

export default ImageChanger;
