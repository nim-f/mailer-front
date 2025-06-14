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
  // Title block update props
  onUpdateTitleContent?: (id: string, content: string) => void;
  onUpdateTitleAlignment?: (id: string, alignment: 'left' | 'center' | 'right') => void;
  onUpdateTitleLevel?: (id: string, level: 1 | 2 | 3) => void;
  // PreHeader block update props
  onUpdatePreHeaderContent?: (id: string, content: string) => void;
  // BodyText block update props
  onUpdateBodyTextContent?: (id: string, content: string) => void;
  onUpdateBodyTextFormatting?: (id: string, formatting: any) => void;
  // ImageVideo block update props
  onUpdateImageVideoContent?: (id: string, updates: Partial<import('../../types/emailTemplate').ImageVideoBlock>) => void;
  // Footer block update props
  onUpdateFooterContent?: (id: string, content: string) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected,
  onUpdateTitleContent,
  onUpdateTitleAlignment,
  onUpdateTitleLevel,
  onUpdatePreHeaderContent,
  onUpdateBodyTextContent,
  onUpdateBodyTextFormatting,
  onUpdateImageVideoContent,
  onUpdateFooterContent
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
          onUpdateContent={onUpdatePreHeaderContent}
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
          onUpdateContent={onUpdateTitleContent}
          onUpdateAlignment={onUpdateTitleAlignment}
          onUpdateLevel={onUpdateTitleLevel}
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
          onUpdateContent={onUpdateImageVideoContent}
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
          onUpdateContent={onUpdateBodyTextContent}
          onUpdateFormatting={onUpdateBodyTextFormatting}
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
          onUpdateContent={onUpdateFooterContent}
        />
      );
    default:
      return <div>Unknown block type</div>;
  }
};
