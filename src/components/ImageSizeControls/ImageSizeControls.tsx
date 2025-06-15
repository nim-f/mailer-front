import React, { useEffect, useState } from 'react';
import classes from './ImageSizeControls.module.css';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

interface ImageSizeControlsProps {
  width: number;
  height: number;
  onSizeChange: (width: number, height: number) => void;
  onUpdate?: (width: number, height: number) => void;
}

export const ImageSizeControls: React.FC<ImageSizeControlsProps> = ({
  width,
  height,
  onSizeChange,
  onUpdate
}) => {
  const [currentWidth, setCurrentWidth] = useState(width);
  const [currentHeight, setCurrentHeight] = useState(height);
  const [isEditing, setIsEditing] = useState(false);

  console.log('imagecontrols', width, height )

  useEffect(() => {
    setCurrentWidth(width);
    setCurrentHeight(height);
  }, [width, height]);

  const handleWidthChange = (newWidth: string) => {
    const parsedWidth = parseInt(newWidth);
    if (!isNaN(parsedWidth) && parsedWidth > 0) {
      setCurrentWidth(parsedWidth);
      onUpdate?.(parsedWidth, currentHeight);
    }
  };

  const handleHeightChange = (newHeight: string) => {
    const parsedHeight = parseInt(newHeight);
    if (!isNaN(parsedHeight) && parsedHeight > 0) {
      setCurrentHeight(parsedHeight);
      onUpdate?.(currentWidth, parsedHeight);
    }
  };

  const handleApply = () => {
    if (onSizeChange && (currentWidth !== width || currentHeight !== height)) {
      onSizeChange(currentWidth, currentHeight);
      setIsEditing(false);
    }
  };

  const handleReset = () => {
    setCurrentWidth(width);
    setCurrentHeight(height);
    setIsEditing(false);
  };

  return (
    <div className={classes.controlsContainer}>
      <div className={classes.inputContainer}>
        <TextInput
          value={currentWidth.toString()}
          onChange={handleWidthChange}
          placeholder="Width"
          disabled={!isEditing}
        />
        <span className={classes.unit}>px</span>
      </div>
      <div className={classes.inputContainer}>
        <TextInput
          value={currentHeight.toString()}
          onChange={handleHeightChange}
          placeholder="Height"
          disabled={!isEditing}
        />
        <span className={classes.unit}>px</span>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => setIsEditing(true)}
          disabled={isEditing}
        >
          Edit Size
        </Button>
        {isEditing && (
          <>
            <Button
              onClick={handleApply}
              disabled={currentWidth === width && currentHeight === height}
            >
              Apply
            </Button>
            <Button
              onClick={handleReset}
              className="secondary"
            >
              Reset
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
