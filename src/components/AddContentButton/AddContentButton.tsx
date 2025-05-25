import React, { useState } from 'react';
import classes from './AddContentButton.module.css';
import ContentDropdown from '../ContentDropdown';

interface AddContentButtonProps {
  columnIndex: number;
  rowId?: string;
  onSelectContent: (contentType: string, columnIndex: number, rowId?: string) => void;
}

export const AddContentButton: React.FC<AddContentButtonProps> = ({
  columnIndex,
  rowId,
  onSelectContent
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleButtonClick = () => {
    setShowDropdown(true);
  };
  
  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };
  
  const handleContentSelect = (contentType: string) => {
    onSelectContent(contentType, columnIndex, rowId);
    handleCloseDropdown();
  };
  
  return (
    <div className={classes.buttonContainer}>
      <button 
        onClick={handleButtonClick} 
        className={classes.addContentButton}
      >
        <span className={classes.buttonIcon}>+</span>
        Add content
      </button>
      
      <ContentDropdown 
        isOpen={showDropdown}
        onClose={handleCloseDropdown}
        onSelectContent={handleContentSelect}
      />
    </div>
  );
};

export default AddContentButton;
