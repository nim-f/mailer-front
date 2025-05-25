import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TitleBlock as TitleBlockType } from '../../types/emailTemplate';
import { BaseBlockWrapper } from './BaseBlock';
import classes from './EmailBlocks.module.css';

interface TitleBlockProps {
  block: TitleBlockType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  isSelected?: boolean;
  onUpdateContent?: (id: string, content: string) => void;
  onUpdateAlignment?: (id: string, alignment: 'left' | 'center' | 'right') => void;
  onUpdateLevel?: (id: string, level: 1 | 2 | 3) => void;
}

export const TitleBlock: React.FC<TitleBlockProps> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected,
  onUpdateContent,
  onUpdateAlignment,
  onUpdateLevel
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(block.content);
  const [editedAlignment, setEditedAlignment] = useState<'left' | 'center' | 'right'>(block.alignment || 'left');
  const [editedLevel, setEditedLevel] = useState<1 | 2 | 3>(block.level || 2);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to exit edit mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (titleRef.current && !titleRef.current.contains(event.target as Node) && isEditing) {
        saveChanges();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, editedContent, editedAlignment, editedLevel]);
  
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
    
    if (onUpdateAlignment && editedAlignment !== block.alignment) {
      onUpdateAlignment(block.id, editedAlignment);
    }
    
    if (onUpdateLevel && editedLevel !== block.level) {
      onUpdateLevel(block.id, editedLevel);
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
      setEditedAlignment(block.alignment || 'left');
      setEditedLevel(block.level || 2);
    }
  };
  
  const handleContentChange = useCallback(() => {
    if (contentEditableRef.current) {
      setEditedContent(contentEditableRef.current.textContent || '');
    }
  }, []);
  const alignmentClass = 
    (isEditing ? editedAlignment : block.alignment) === 'center' ? classes.alignCenter :
    (isEditing ? editedAlignment : block.alignment) === 'right' ? classes.alignRight :
    classes.alignLeft;

  const renderTitle = () => {
    if (isEditing) {
      return (
        <div className={classes.titleEditContainer} ref={titleRef}>
          <div className={classes.titleEditControls}>
            <select 
              value={editedLevel} 
              onChange={(e) => setEditedLevel(Number(e.target.value) as 1 | 2 | 3)}
              className={classes.titleLevelSelect}
            >
              <option value={1}>Heading 1 (Large)</option>
              <option value={2}>Heading 2 (Medium)</option>
              <option value={3}>Heading 3 (Small)</option>
            </select>
            
            <div className={classes.alignmentControls}>
              <button 
                className={`${classes.alignButton} ${editedAlignment === 'left' ? classes.activeAlign : ''}`}
                onClick={() => setEditedAlignment('left')}
                title="Align Left"
              >
                ←
              </button>
              <button 
                className={`${classes.alignButton} ${editedAlignment === 'center' ? classes.activeAlign : ''}`}
                onClick={() => setEditedAlignment('center')}
                title="Align Center"
              >
                ↔
              </button>
              <button 
                className={`${classes.alignButton} ${editedAlignment === 'right' ? classes.activeAlign : ''}`}
                onClick={() => setEditedAlignment('right')}
                title="Align Right"
              >
                →
              </button>
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
                  setEditedAlignment(block.alignment || 'left');
                  setEditedLevel(block.level || 2);
                }}
                title="Cancel"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div 
            className={`${classes.titleEditContent} ${alignmentClass}`}
            contentEditable
            suppressContentEditableWarning
            ref={contentEditableRef}
            onInput={handleContentChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      );
    }
    
    // Use the block's actual values for display, not the edited values which are only for the edit mode
    const displayLevel = block.level || 2;
    const displayAlignment = block.alignment || 'left';
    const displayAlignmentClass = 
      displayAlignment === 'center' ? classes.alignCenter :
      displayAlignment === 'right' ? classes.alignRight :
      classes.alignLeft;
      
    switch (displayLevel) {
      case 1:
        return <h1 className={displayAlignmentClass} onDoubleClick={toggleEditMode}>{block.content}</h1>;
      case 2:
        return <h2 className={displayAlignmentClass} onDoubleClick={toggleEditMode}>{block.content}</h2>;
      case 3:
        return <h3 className={displayAlignmentClass} onDoubleClick={toggleEditMode}>{block.content}</h3>;
      default:
        return <h2 className={displayAlignmentClass} onDoubleClick={toggleEditMode}>{block.content}</h2>;
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
      <div className={`${classes.titleBlock} ${isEditing ? classes.editing : ''}`}>
        {renderTitle()}
        {!isEditing && onUpdateContent && (
          <div className={classes.editHint}>
            Double-click to edit
          </div>
        )}
      </div>
    </BaseBlockWrapper>
  );
};
