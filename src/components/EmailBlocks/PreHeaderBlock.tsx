import React from 'react';
import { PreHeaderBlock as PreHeaderBlockType } from '../../types/emailTemplate';
import { BaseBlockWrapper } from './BaseBlock';
import classes from './EmailBlocks.module.css';

interface PreHeaderBlockProps {
  block: PreHeaderBlockType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  isSelected?: boolean;
}

export const PreHeaderBlock: React.FC<PreHeaderBlockProps> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected
}) => {
  return (
    <BaseBlockWrapper
      block={block}
      onEdit={onEdit}
      onDelete={onDelete}
      onMove={onMove}
      isSelected={isSelected}
    >
      <div className={classes.preHeaderBlock}>
        {block.content}
      </div>
    </BaseBlockWrapper>
  );
};
