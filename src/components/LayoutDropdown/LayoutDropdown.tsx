import React from 'react';
import classes from './LayoutDropdown.module.css';

interface LayoutDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLayout: (layout: string) => void;
}

export const LayoutDropdown: React.FC<LayoutDropdownProps> = ({ 
  isOpen, 
  onClose,
  onSelectLayout
}) => {
  if (!isOpen) return null;

  return (
    <div className={classes.layoutDropdown}>
      <div className={classes.closeButton} onClick={onClose}>
        ×
      </div>
      <div className={classes.layoutOptions}>
        <div 
          className={classes.layoutOption}
          onClick={() => onSelectLayout('single')}
        >
          <div className={classes.layoutIcon}>
            <div className={classes.singleColumnIcon}></div>
          </div>
          <div className={classes.layoutLabel}>Single column</div>
        </div>
        <div 
          className={classes.layoutOption}
          onClick={() => onSelectLayout('double')}
        >
          <div className={classes.layoutIcon}>
            <div className={classes.doubleColumnIcon}></div>
          </div>
          <div className={classes.layoutLabel}>Double columns</div>
        </div>
        <div className={classes.moreOptions}>...</div>
      </div>
    </div>
  );
};

export default LayoutDropdown;
