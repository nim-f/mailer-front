import React from 'react';
import { ImageVideoBlock as ImageVideoBlockType } from '../../types/emailTemplate';
import { BaseBlockWrapper } from './BaseBlock';
import classes from './EmailBlocks.module.css';

interface ImageVideoBlockProps {
  block: ImageVideoBlockType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  isSelected?: boolean;
}

export const ImageVideoBlock: React.FC<ImageVideoBlockProps> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected
}) => {
  const renderMedia = () => {
    if (block.mediaType === 'image') {
      const imageContent = (
        <img 
          src={block.url} 
          alt={block.alt || ''} 
          style={{ 
            width: block.width ? `${block.width}px` : '100%',
            height: block.height ? `${block.height}px` : 'auto'
          }} 
        />
      );

      if (block.link) {
        return <a href={block.link} target="_blank" rel="noopener noreferrer">{imageContent}</a>;
      }

      return imageContent;
    } else {
      // Video rendering
      return (
        <video 
          controls 
          src={block.url}
          style={{ 
            width: block.width ? `${block.width}px` : '100%',
            height: block.height ? `${block.height}px` : 'auto'
          }}
        >
          Your browser does not support the video tag.
        </video>
      );
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
      <div className={classes.imageBlock}>
        {renderMedia()}
        {block.caption && <div className={classes.imageCaption}>{block.caption}</div>}
      </div>
    </BaseBlockWrapper>
  );
};
