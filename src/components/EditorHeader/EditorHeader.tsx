import React, { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import classes from "./editorHeader.module.css";

interface EditorHeaderProps {
    title: string;
    onSave?: () => void;
    isSaving?: boolean;
    onTitleChange?: (newTitle: string) => void;
}

export const EditorHeader = ({ title, onSave, isSaving = false, onTitleChange }: EditorHeaderProps) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const titleInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        setEditedTitle(title);
    }, [title]);
    
    useEffect(() => {
        if (isEditingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
            titleInputRef.current.select();
        }
    }, [isEditingTitle]);
    
    const handleTitleClick = () => {
        if (onTitleChange) {
            setIsEditingTitle(true);
        }
    };
    
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(e.target.value);
    };
    
    const handleTitleBlur = () => {
        if (editedTitle.trim() && onTitleChange) {
            onTitleChange(editedTitle);
        } else {
            setEditedTitle(title); // Reset to original if empty
        }
        setIsEditingTitle(false);
    };
    
    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (editedTitle.trim() && onTitleChange) {
                onTitleChange(editedTitle);
            } else {
                setEditedTitle(title); // Reset to original if empty
            }
            setIsEditingTitle(false);
        } else if (e.key === 'Escape') {
            setEditedTitle(title); // Reset to original
            setIsEditingTitle(false);
        }
    };
    return (
        <div className={classes.editor_header}>
            <div className={classes.editor_header__title}>
                {isEditingTitle ? (
                    <input
                        ref={titleInputRef}
                        type="text"
                        value={editedTitle}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        onKeyDown={handleTitleKeyDown}
                        className={classes.titleInput}
                        placeholder="Enter template name"
                    />
                ) : (
                    <div className={classes.titleWrapper}>
                        <h1 
                            onClick={handleTitleClick}
                            className={onTitleChange ? classes.editableTitle : ''}
                            title={onTitleChange ? "Click to edit template name" : ""}
                        >
                            {title}
                        </h1>
                        {onTitleChange && (
                            <button 
                                className={classes.editButton}
                                onClick={handleTitleClick}
                                title="Edit template name"
                            >
                                <span className={classes.editIcon}>✎</span>
                            </button>
                        )}
                    </div>
                )}
                <Dropdown items={[]}></Dropdown>
            </div>

            <div>
                <Button onClick={onSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <Button>Preview</Button>
                <Button>Close</Button>
            </div>
        </div>
    );
};
