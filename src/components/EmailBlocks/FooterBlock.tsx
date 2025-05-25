import React from 'react';
import { FooterBlock as FooterBlockType } from '../../types/emailTemplate';
import { BaseBlockWrapper } from './BaseBlock';
import classes from './EmailBlocks.module.css';

interface FooterBlockProps {
  block: FooterBlockType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  isSelected?: boolean;
  onUpdateContent?: (id: string, content: string) => void;
}

export const FooterBlock: React.FC<FooterBlockProps> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected
}) => {
  return (
    <BaseBlockWrapper
      block={block}
      onEdit={onEdit}
      onDelete={onDelete}
      onMove={onMove}
      isSelected={isSelected}
    >
      <div className={classes.footerBlock}>
        <div>{block.content}</div>
        
        {block.includeSocialLinks && (
          <div className={classes.socialLinks}>
            {block.includeSocialLinks.facebook && (
              <a 
                href={block.includeSocialLinks.facebook} 
                className={classes.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                f
              </a>
            )}
            {block.includeSocialLinks.twitter && (
              <a 
                href={block.includeSocialLinks.twitter} 
                className={classes.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                t
              </a>
            )}
            {block.includeSocialLinks.instagram && (
              <a 
                href={block.includeSocialLinks.instagram} 
                className={classes.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                i
              </a>
            )}
            {block.includeSocialLinks.linkedin && (
              <a 
                href={block.includeSocialLinks.linkedin} 
                className={classes.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                in
              </a>
            )}
          </div>
        )}
        
        {block.includeUnsubscribe && (
          <div className={classes.unsubscribeLink}>
            <a href="#unsubscribe">Unsubscribe</a> from this mailing list.
          </div>
        )}
      </div>
    </BaseBlockWrapper>
  );
};
