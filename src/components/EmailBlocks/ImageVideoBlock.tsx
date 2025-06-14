import React, { useState, useRef } from 'react';
import { ImageVideoBlock as ImageVideoBlockType } from '../../types/emailTemplate';
import { BaseBlockWrapper } from './BaseBlock';
import classes from './EmailBlocks.module.css';
import { uploadFile } from '../../services/fileUploadService';

interface ImageVideoBlockProps {
  block: ImageVideoBlockType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
  isSelected?: boolean;
  onUpdateContent?: (id: string, updates: Partial<ImageVideoBlockType>) => void;
}

export const ImageVideoBlock: React.FC<ImageVideoBlockProps> = ({
  block,
  onEdit,
  onDelete,
  onMove,
  isSelected,
  onUpdateContent
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !onUpdateContent) return;
    
    const file = files[0];
    const fileType = file.type.startsWith('image/') ? 'image' : 'video';
    
    // Only accept images and videos
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert('Please upload an image or video file');
      return;
    }
    
    try {
      setIsUploading(true);
      setUploadProgress(10);
      
      // Simulate progress (in a real app, you would get this from the upload API)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 300);
      
      // Upload the file
      const fileUrl = await uploadFile(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Update the block with the new media
      onUpdateContent(block.id, {
        url: fileUrl,
        mediaType: fileType as 'image' | 'video',
        alt: file.name
      });
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploading(false);
      setUploadProgress(0);
      alert('Failed to upload file. Please try again.');
    }
  };
  
  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
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
        {block.url ? (
          <>
            {renderMedia()}
            {block.caption && <div className={classes.imageCaption}>{block.caption}</div>}
            {isSelected && onUpdateContent && (
              <div className={classes.mediaControls}>
                <button 
                  className={classes.replaceMediaBtn}
                  onClick={triggerFileUpload}
                >
                  Replace {block.mediaType}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={block.mediaType === 'image' ? 'image/*' : 'video/*'}
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </div>
            )}
          </>
        ) : (
          <div className={classes.uploadContainer} onClick={triggerFileUpload}>
            {isUploading ? (
              <div className={classes.uploadProgress}>
                <div 
                  className={classes.progressBar} 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <span>{uploadProgress}%</span>
              </div>
            ) : (
              <>
                <div className={classes.uploadIcon}>+</div>
                <div className={classes.uploadText}>
                  Click to upload {block.mediaType}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={block.mediaType === 'image' ? 'image/*' : 'video/*'}
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </>
            )}
          </div>
        )}
      </div>
    </BaseBlockWrapper>
  );
};
