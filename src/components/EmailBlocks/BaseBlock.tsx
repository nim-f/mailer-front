import React from 'react';
import { BaseBlock as BaseBlockType } from '../../types/emailTemplate';
import classes from './EmailBlocks.module.css';

interface BaseBlockProps {
  block: BaseBlockType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  isSelected?: boolean;
}

export const BaseBlockWrapper: React.FC<React.PropsWithChildren<BaseBlockProps>> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected,
  children
}) => {
  return (
    <div 
      className={`${classes.blockWrapper} ${isSelected ? classes.selectedBlock : ''}`}
      data-block-id={block.id}
    >
      {isSelected && (
        <div className={classes.blockControls}>
          <button 
            className={classes.blockControlButton} 
            onClick={() => onMove && onMove(block.id, 'up')}
            title="Move up"
          >
            ↑
          </button>
          <button 
            className={classes.blockControlButton} 
            onClick={() => onMove && onMove(block.id, 'down')}
            title="Move down"
          >
            ↓
          </button>
          <button 
            className={classes.blockControlButton} 
            onClick={() => onEdit && onEdit(block.id)}
            title="Edit"
          >
            ✏️
          </button>
          <button 
            className={classes.blockControlButton} 
            onClick={() => onDelete && onDelete(block.id)}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      )}
      <div className={classes.blockContent}>
        {children}
      </div>
    </div>
  );
};
