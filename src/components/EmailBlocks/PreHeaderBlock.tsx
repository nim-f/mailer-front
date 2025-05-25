import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PreHeaderBlock as PreHeaderBlockType } from '../../types/emailTemplate';
import { BaseBlockWrapper } from './BaseBlock';
import classes from './EmailBlocks.module.css';

interface PreHeaderBlockProps {
  block: PreHeaderBlockType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  isSelected?: boolean;
  onUpdateContent?: (id: string, content: string) => void;
}

export const PreHeaderBlock: React.FC<PreHeaderBlockProps> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected,
  onUpdateContent
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(block.content);
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
  }, [isEditing, editedContent]);
  
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
    
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveChanges();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedContent(block.content);
    }
  };
  
  const handleContentChange = useCallback(() => {
    if (contentEditableRef.current) {
      setEditedContent(contentEditableRef.current.textContent || '');
    }
  }, []);
  return (
    <BaseBlockWrapper
      block={block}
      onEdit={onEdit}
      onDelete={onDelete}
      onMove={onMove}
      isSelected={isSelected}
    >
      <div className={`${classes.preHeaderBlock} ${isEditing ? classes.editing : ''}`} ref={blockRef}>
        {isEditing ? (
          <div className={classes.preHeaderEditContainer}>
            <div 
              className={classes.preHeaderEditContent}
              contentEditable
              suppressContentEditableWarning
              ref={contentEditableRef}
              onInput={handleContentChange}
              onKeyDown={handleKeyDown}
            />
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
                }}
                title="Cancel"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <>
            <span onDoubleClick={toggleEditMode}>{block.content}</span>
            {onUpdateContent && (
              <div className={classes.editHint}>
                Double-click to edit
              </div>
            )}
          </>
        )}
      </div>
    </BaseBlockWrapper>
  );
};
