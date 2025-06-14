import React, { useState, useRef } from 'react';
import { ImageVideoBlock as ImageVideoBlockType } from '../../types/emailTemplate';
import { BaseBlockWrapper } from './BaseBlock';
import classes from './EmailBlocks.module.css';
import { uploadFile } from '../../services/fileUploadService';
import { CSSProperties } from 'react';
import { ImageSizeControls } from '../ImageSizeControls/ImageSizeControls';
import Button from '../Button/Button';


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
  const [currentWidth, setCurrentWidth] = useState(block.width ?? 500);
  const [currentHeight, setCurrentHeight] = useState(block.height ?? 300);
  
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
      
      // Update the block content
      onUpdateContent?.(block.id, {
        url: fileUrl,
        mediaType: fileType,
        alt: '',
        caption: '',
        link: '',
        width: 600,
        height: 400
      });
      
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Clean up progress interval
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Reset after a short delay
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Failed to upload file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  const handleEdit = () => {
    onEdit?.(block.id);
  };

  const handleDelete = () => {
    onDelete?.(block.id);
  };

  const handleMove = (id: string, direction: 'up' | 'down') => {
    onMove?.(id, direction);
  };

  const handleSizeChange = (width: number, height: number) => {
    onUpdateContent?.(block.id, {
      width,
      height
    });
  };

  const handleResize = (width: number, height: number) => {
    setCurrentWidth(width);
    setCurrentHeight(height);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <BaseBlockWrapper
      block={block}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onMove={handleMove}
      isSelected={isSelected}
    >
      <div className={classes.blockContent}>
        <div className={classes.imageVideoContainer}>
          {block.mediaType === 'image' ? (
            <div
              className={classes.resizableContainer}
              style={{
                width: `${block.width}px`,
                height: `${block.height}px`,
                position: 'relative'
              }}
            >
              <div
                className={classes.resizeHandle}
                style={{
                  position: 'absolute' as CSSProperties['position'],
                  width: 10,
                  height: 10,
                  right: 0,
                  bottom: 0,
                  cursor: 'se-resize'
                }}
                onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                  const container = e.currentTarget.parentElement;
                  if (!container) return;

                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startWidth = parseInt(container.style.width) || block.width || 0;
                  const startHeight = parseInt(container.style.height) || block.height || 0;

                  const onMouseMove = (moveEvent: MouseEvent) => {
                    const width = Math.max(100, startWidth + moveEvent.clientX - startX);
                    const height = Math.max(100, startHeight + moveEvent.clientY - startY);
                    
                    container.style.width = `${width}px`;
                    container.style.height = `${height}px`;
                    handleResize(width, height);
                    console.log(width, height)
                  };

                  const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                  };

                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp);

                  e.preventDefault();
                }}
              />
              <img
                src={block.url}
                alt={block.alt || 'Image'}
                className={classes.image}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          ) : (
            <div
              className={classes.resizableContainer}
              style={{
                width: `${block.width}px`,
                height: `${block.height}px`,
                position: 'relative'
              }}
            >
              <div
                className={classes.resizeHandle}
                style={{
                  position: 'absolute' as CSSProperties['position'],
                  width: 10,
                  height: 10,
                  right: 0,
                  bottom: 0,
                  cursor: 'se-resize'
                }}
                onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                  const container = e.currentTarget.parentElement;
                  if (!container) return;

                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startWidth = parseInt(container.style.width) || block.width || 0;
                  const startHeight = parseInt(container.style.height) || block.height || 0;

                  const onMouseMove = (moveEvent: MouseEvent) => {
                    const width = Math.max(100, startWidth + moveEvent.clientX - startX);
                    const height = Math.max(100, startHeight + moveEvent.clientY - startY);
                    
                    container.style.width = `${width}px`;
                    container.style.height = `${height}px`;
                    handleResize(width, height);

                    console.log(width, height);
                  };

                  const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                  };

                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp);

                  e.preventDefault();
                }}
              />
              <video
                src={block.url}
                controls
                className={classes.video}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          )}
        </div>
        
        <div className={classes.controls}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,video/*"
            style={{ display: 'none' }}
          />
          
          <Button
            onClick={handleFileUploadClick}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Change Media'}
          </Button>
          
          <div className={classes.progress}>
            {isUploading && (
              <progress value={uploadProgress} max="100"></progress>
            )}
          </div>
          
          <ImageSizeControls
            width={currentWidth}
            height={currentHeight}
            onSizeChange={handleSizeChange}
            onUpdate={handleResize}
          />
        </div>
      </div>
    </BaseBlockWrapper>
  );
};
