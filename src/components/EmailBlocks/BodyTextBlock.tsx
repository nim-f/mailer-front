import React from 'react';
import { BodyTextBlock as BodyTextBlockType } from '../../types/emailTemplate';
import { BaseBlockWrapper } from './BaseBlock';
import classes from './EmailBlocks.module.css';

interface BodyTextBlockProps {
  block: BodyTextBlockType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  isSelected?: boolean;
}

export const BodyTextBlock: React.FC<BodyTextBlockProps> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected
}) => {
  const { formatting } = block;
  
  const textStyle: React.CSSProperties = {
    fontWeight: formatting?.bold ? 'bold' : 'normal',
    fontStyle: formatting?.italic ? 'italic' : 'normal',
    textDecoration: formatting?.underline ? 'underline' : 'none',
    color: formatting?.color || 'inherit',
    fontSize: formatting?.fontSize ? `${formatting.fontSize}px` : 'inherit',
    textAlign: formatting?.alignment || 'left'
  };

  return (
    <BaseBlockWrapper
      block={block}
      onEdit={onEdit}
      onDelete={onDelete}
      onMove={onMove}
      isSelected={isSelected}
    >
      <div className={classes.bodyTextBlock} style={textStyle}>
        {block.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </BaseBlockWrapper>
  );
};
