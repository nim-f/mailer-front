// Types for the email template data structure

// Main template structure
export interface EmailTemplate {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  layout: LayoutType;
  blocks: Block[];
  metadata: TemplateMetadata;
}

// Layout types
export type LayoutType = 'single' | 'double';

// Metadata for the template
export interface TemplateMetadata {
  author: string;
  description?: string;
  tags?: string[];
  isShared: boolean;
  sharedWith?: string[];
}

// Base block interface
export interface BaseBlock {
  id: string;
  type: BlockType;
  column: number; // 0 for single column or left column, 1 for right column
  order: number; // Position in the column
  settings?: Record<string, any>; // Block-specific settings
}

// Block types
export type BlockType = 'pre-header' | 'title' | 'image-video' | 'body-text' | 'table' | 'footer';

// Specific block types
export interface PreHeaderBlock extends BaseBlock {
  type: 'pre-header';
  content: string;
}

export interface TitleBlock extends BaseBlock {
  type: 'title';
  content: string;
  level: 1 | 2 | 3; // Heading level
  alignment: 'left' | 'center' | 'right';
}

export interface ImageVideoBlock extends BaseBlock {
  type: 'image-video';
  mediaType: 'image' | 'video';
  url: string;
  alt?: string;
  caption?: string;
  link?: string;
  width?: number;
  height?: number;
}

export interface BodyTextBlock extends BaseBlock {
  type: 'body-text';
  content: string;
  formatting?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    color?: string;
    fontSize?: number;
    alignment?: 'left' | 'center' | 'right' | 'justify';
  };
}

export interface TableBlock extends BaseBlock {
  type: 'table';
  headers: string[];
  rows: string[][];
  style?: {
    headerBackground?: string;
    headerColor?: string;
    borderColor?: string;
    alternateRowBackground?: boolean;
  };
}

export interface FooterBlock extends BaseBlock {
  type: 'footer';
  content: string;
  includeUnsubscribe: boolean;
  includeSocialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

// Union type for all block types
export type Block = PreHeaderBlock | TitleBlock | ImageVideoBlock | BodyTextBlock | TableBlock | FooterBlock;

// Sample template for testing
export const sampleTemplate: EmailTemplate = {
  id: 'template-1',
  name: 'Marketing Newsletter',
  createdAt: '2025-05-25T10:30:00Z',
  updatedAt: '2025-05-25T10:35:00Z',
  layout: 'double',
  blocks: [
    {
      id: 'block-1',
      type: 'pre-header',
      column: 0,
      order: 0,
      content: 'Special offers inside - Open now!'
    },
    {
      id: 'block-2',
      type: 'title',
      column: 0,
      order: 1,
      content: 'May Newsletter',
      level: 1,
      alignment: 'center'
    },
    {
      id: 'block-3',
      type: 'image-video',
      column: 0,
      order: 2,
      mediaType: 'image',
      url: 'https://example.com/header-image.jpg',
      alt: 'Newsletter header image',
      width: 600,
      height: 200
    },
    {
      id: 'block-4',
      type: 'body-text',
      column: 0,
      order: 3,
      content: 'Welcome to our May newsletter! We have some exciting updates to share with you.',
      formatting: {
        alignment: 'left',
        fontSize: 16
      }
    },
    {
      id: 'block-5',
      type: 'title',
      column: 1,
      order: 0,
      content: 'Featured Products',
      level: 2,
      alignment: 'left'
    },
    {
      id: 'block-6',
      type: 'body-text',
      column: 1,
      order: 1,
      content: 'Check out our latest products that are trending this month.',
      formatting: {
        alignment: 'left',
        fontSize: 14
      }
    },
    {
      id: 'block-7',
      type: 'table',
      column: 1,
      order: 2,
      headers: ['Product', 'Price', 'Availability'],
      rows: [
        ['Product A', '$99.99', 'In Stock'],
        ['Product B', '$149.99', 'Limited'],
        ['Product C', '$79.99', 'In Stock']
      ],
      style: {
        headerBackground: '#2579FF',
        headerColor: '#FFFFFF',
        borderColor: '#E2EAF0',
        alternateRowBackground: true
      }
    },
    {
      id: 'block-8',
      type: 'footer',
      column: 0,
      order: 4,
      content: '© 2025 Your Company. All rights reserved.',
      includeUnsubscribe: true,
      includeSocialLinks: {
        facebook: 'https://facebook.com/yourcompany',
        twitter: 'https://twitter.com/yourcompany',
        instagram: 'https://instagram.com/yourcompany'
      }
    }
  ],
  metadata: {
    author: 'Marketing Team',
    description: 'Monthly newsletter template for marketing campaigns',
    tags: ['newsletter', 'marketing', 'monthly'],
    isShared: false
  }
};
