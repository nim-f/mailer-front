import React from 'react';
import { TableBlock as TableBlockType } from '../../types/emailTemplate';
import { BaseBlockWrapper } from './BaseBlock';
import classes from './EmailBlocks.module.css';

interface TableBlockProps {
  block: TableBlockType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  isSelected?: boolean;
}

export const TableBlock: React.FC<TableBlockProps> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected
}) => {
  const { style } = block;
  
  const headerStyle: React.CSSProperties = {
    backgroundColor: style?.headerBackground || '#f0f0f0',
    color: style?.headerColor || 'inherit',
  };

  const tableStyle: React.CSSProperties = {
    borderColor: style?.borderColor || '#E2EAF0',
  };

  return (
    <BaseBlockWrapper
      block={block}
      onEdit={onEdit}
      onDelete={onDelete}
      onMove={onMove}
      isSelected={isSelected}
    >
      <table className={classes.tableBlock} style={tableStyle}>
        <thead>
          <tr>
            {block.headers.map((header, index) => (
              <th key={index} style={headerStyle}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={style?.alternateRowBackground && rowIndex % 2 === 1 ? classes.alternateRow : ''}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </BaseBlockWrapper>
  );
};
