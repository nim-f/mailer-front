import React from 'react';
import { Block } from '../../types/emailTemplate';
import { PreHeaderBlock } from './PreHeaderBlock';
import { TitleBlock } from './TitleBlock';
import { ImageVideoBlock } from './ImageVideoBlock';
import { BodyTextBlock } from './BodyTextBlock';
import { TableBlock } from './TableBlock';
import { FooterBlock } from './FooterBlock';

interface BlockRendererProps {
  block: Block;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  isSelected?: boolean;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected
}) => {
  switch (block.type) {
    case 'pre-header':
      return (
        <PreHeaderBlock
          block={block}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
          isSelected={isSelected}
        />
      );
    case 'title':
      return (
        <TitleBlock
          block={block}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
          isSelected={isSelected}
        />
      );
    case 'image-video':
      return (
        <ImageVideoBlock
          block={block}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
          isSelected={isSelected}
        />
      );
    case 'body-text':
      return (
        <BodyTextBlock
          block={block}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
          isSelected={isSelected}
        />
      );
    case 'table':
      return (
        <TableBlock
          block={block}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
          isSelected={isSelected}
        />
      );
    case 'footer':
      return (
        <FooterBlock
          block={block}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
          isSelected={isSelected}
        />
      );
    default:
      return <div>Unknown block type</div>;
  }
};
