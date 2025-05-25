import React from 'react';
import classes from './ContentDropdown.module.css';

interface ContentDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectContent: (contentType: string) => void;
}

export const ContentDropdown: React.FC<ContentDropdownProps> = ({
  isOpen,
  onClose,
  onSelectContent
}) => {
  if (!isOpen) return null;

  const contentTypes = [
    { id: 'pre-header', name: 'Pre-header', icon: '□' },
    { id: 'title', name: 'Title', icon: '⊟' },
    { id: 'image-video', name: 'Image/Video', icon: '⊟' },
    { id: 'body-text', name: 'Body text', icon: '⊟' },
    { id: 'table', name: 'Table', icon: '⊟' },
    { id: 'footer', name: 'Footer', icon: '⊟' }
  ];

  const handleContentSelect = (contentType: string) => {
    onSelectContent(contentType);
    onClose();
  };

  return (
      <div 
        className={classes.contentDropdown}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.closeButton} onClick={onClose}>
          ×
        </div>
        <div className={classes.contentGrid}>
          {contentTypes.map((content) => (
            <div 
              key={content.id} 
              className={classes.contentOption}
              onClick={() => handleContentSelect(content.id)}
            >
              <div className={classes.contentIcon}>
                {content.icon}
              </div>
              <div className={classes.contentLabel}>
                {content.name}
              </div>
            </div>
          ))}
        </div>
        <div className={classes.moreOptions}>...</div>
        <div className={classes.userIcon}>👤</div>
      </div>
  );
};

export default ContentDropdown;
