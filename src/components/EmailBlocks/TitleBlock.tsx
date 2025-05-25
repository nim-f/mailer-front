import React from 'react';
import { TitleBlock as TitleBlockType } from '../../types/emailTemplate';
import { BaseBlockWrapper } from './BaseBlock';
import classes from './EmailBlocks.module.css';

interface TitleBlockProps {
  block: TitleBlockType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  isSelected?: boolean;
}

export const TitleBlock: React.FC<TitleBlockProps> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected
}) => {
  const alignmentClass = 
    block.alignment === 'center' ? classes.alignCenter :
    block.alignment === 'right' ? classes.alignRight :
    classes.alignLeft;

  const renderTitle = () => {
    switch (block.level) {
      case 1:
        return <h1 className={alignmentClass}>{block.content}</h1>;
      case 2:
        return <h2 className={alignmentClass}>{block.content}</h2>;
      case 3:
        return <h3 className={alignmentClass}>{block.content}</h3>;
      default:
        return <h2 className={alignmentClass}>{block.content}</h2>;
    }
  };

  return (
    <BaseBlockWrapper
      block={block}
      onEdit={onEdit}
      onDelete={onDelete}
      onMove={onMove}
      isSelected={isSelected}
    >
      <div className={classes.titleBlock}>
        {renderTitle()}
      </div>
    </BaseBlockWrapper>
  );
};
