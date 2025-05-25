import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BodyTextBlock as BodyTextBlockType } from '../../types/emailTemplate';
import { BaseBlockWrapper } from './BaseBlock';
import classes from './EmailBlocks.module.css';

interface BodyTextBlockProps {
  block: BodyTextBlockType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  isSelected?: boolean;
  onUpdateContent?: (id: string, content: string) => void;
  onUpdateFormatting?: (id: string, formatting: any) => void;
}

export const BodyTextBlock: React.FC<BodyTextBlockProps> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected,
  onUpdateContent,
  onUpdateFormatting
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(block.content);
  const [editedFormatting, setEditedFormatting] = useState(block.formatting || {
    alignment: 'left' as const,
    fontSize: 16,
    bold: false,
    italic: false,
    underline: false,
    color: '#000000'
  });
  
  const blockRef = useRef<HTMLDivElement>(null);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to exit edit mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (blockRef.current && !blockRef.current.contains(event.target as Node) && isEditing) {
        saveChanges();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, editedContent, editedFormatting]);
  
  // Set focus on the contentEditable element when entering edit mode
  useEffect(() => {
    if (isEditing && contentEditableRef.current) {
      contentEditableRef.current.focus();
      
      // Place cursor at the end of the text
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(contentEditableRef.current);
      range.collapse(false); // false means collapse to end
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);
  
  // Initialize contentEditable with the block content when entering edit mode
  useEffect(() => {
    if (isEditing && contentEditableRef.current) {
      contentEditableRef.current.textContent = editedContent;
    }
  }, [isEditing, block.content]);

  const toggleEditMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    if (onUpdateContent && editedContent !== block.content) {
      onUpdateContent(block.id, editedContent);
    }
    
    if (onUpdateFormatting && JSON.stringify(editedFormatting) !== JSON.stringify(block.formatting)) {
      onUpdateFormatting(block.id, editedFormatting);
    }
    
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      // Allow shift+enter for new lines
      return;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      saveChanges();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedContent(block.content);
      setEditedFormatting(block.formatting || { alignment: 'left', fontSize: 16 });
    }
  };
  
  const handleContentChange = useCallback(() => {
    if (contentEditableRef.current) {
      setEditedContent(contentEditableRef.current.textContent || '');
    }
  }, []);
  
  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    setEditedFormatting(prev => ({
      ...prev,
      alignment
    }));
  };
  
  const handleFontSizeChange = (fontSize: number) => {
    setEditedFormatting(prev => ({
      ...prev,
      fontSize
    }));
  };
  const { formatting } = block;
  
  // Style for display mode
  const displayTextStyle: React.CSSProperties = {
    fontWeight: formatting?.bold ? 'bold' : 'normal',
    fontStyle: formatting?.italic ? 'italic' : 'normal',
    textDecoration: formatting?.underline ? 'underline' : 'none',
    color: formatting?.color || 'inherit',
    fontSize: formatting?.fontSize ? `${formatting.fontSize}px` : 'inherit',
    textAlign: formatting?.alignment as React.CSSProperties['textAlign'] || 'left'
  };
  
  // Style for edit mode
  const editTextStyle: React.CSSProperties = {
    fontWeight: editedFormatting.bold ? 'bold' : 'normal',
    fontStyle: editedFormatting.italic ? 'italic' : 'normal',
    textDecoration: editedFormatting.underline ? 'underline' : 'none',
    color: editedFormatting.color || 'inherit',
    fontSize: `${editedFormatting.fontSize}px`,
    textAlign: editedFormatting.alignment as React.CSSProperties['textAlign']
  };

  return (
    <BaseBlockWrapper
      block={block}
      onEdit={onEdit}
      onDelete={onDelete}
      onMove={onMove}
      isSelected={isSelected}
    >
      <div className={`${classes.bodyTextBlock} ${isEditing ? classes.editing : ''}`} ref={blockRef}>
        {isEditing ? (
          <div className={classes.bodyTextEditContainer}>
            <div className={classes.bodyTextEditControls}>
              <div className={classes.formattingControls}>
                <div className={classes.alignmentControls}>
                  <button 
                    className={`${classes.alignButton} ${editedFormatting.alignment === 'left' ? classes.activeAlign : ''}`}
                    onClick={() => handleAlignmentChange('left')}
                    title="Align Left"
                  >
                    ←
                  </button>
                  <button 
                    className={`${classes.alignButton} ${editedFormatting.alignment === 'center' ? classes.activeAlign : ''}`}
                    onClick={() => handleAlignmentChange('center')}
                    title="Align Center"
                  >
                    ↔
                  </button>
                  <button 
                    className={`${classes.alignButton} ${editedFormatting.alignment === 'right' ? classes.activeAlign : ''}`}
                    onClick={() => handleAlignmentChange('right')}
                    title="Align Right"
                  >
                    →
                  </button>
                  <button 
                    className={`${classes.alignButton} ${editedFormatting.alignment === 'justify' ? classes.activeAlign : ''}`}
                    onClick={() => handleAlignmentChange('justify')}
                    title="Justify"
                  >
                    ≡
                  </button>
                </div>
                
                <div className={classes.fontSizeControl}>
                  <label htmlFor="fontSize">Size:</label>
                  <select 
                    id="fontSize"
                    value={editedFormatting.fontSize} 
                    onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                    className={classes.fontSizeSelect}
                  >
                    <option value={12}>12px</option>
                    <option value={14}>14px</option>
                    <option value={16}>16px</option>
                    <option value={18}>18px</option>
                    <option value={20}>20px</option>
                    <option value={24}>24px</option>
                  </select>
                </div>
              </div>
              
              <div className={classes.editActionButtons}>
                <button 
                  className={classes.saveButton} 
                  onClick={saveChanges}
                  title="Save"
                >
                  ✓
                </button>
                <button 
                  className={classes.cancelButton} 
                  onClick={() => {
                    setIsEditing(false);
                    setEditedContent(block.content);
                    setEditedFormatting(formatting || { alignment: 'left', fontSize: 16 });
                  }}
                  title="Cancel"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div 
              className={classes.bodyTextEditContent}
              contentEditable
              suppressContentEditableWarning
              ref={contentEditableRef}
              onInput={handleContentChange}
              onKeyDown={handleKeyDown}
              style={editTextStyle}
            />
            <div className={classes.editTip}>
              Tip: Press Shift+Enter for a new line
            </div>
          </div>
        ) : (
          <div onDoubleClick={toggleEditMode} style={displayTextStyle}>
            {block.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {onUpdateContent && (
              <div className={classes.editHint}>
                Double-click to edit
              </div>
            )}
          </div>
        )}
      </div>
    </BaseBlockWrapper>
  );
};
