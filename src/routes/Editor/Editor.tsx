import { EditorHeader } from "../../components/EditorHeader/EditorHeader";
import Button from "../../components/Button/Button";
import classes from "./Editor.module.css";
import { useState, useEffect } from "react";
import LayoutDropdown from "../../components/LayoutDropdown";
import AddContentButton from "../../components/AddContentButton";
import { EmailTemplate, Block, BlockType, sampleTemplate } from "../../types/emailTemplate";
import { BlockRenderer } from "../../components/EmailBlocks";
import { v4 as uuidv4 } from 'uuid';

export const Editor = () => {
    const [showLayoutDropdown, setShowLayoutDropdown] = useState(false);
    const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
    const [template, setTemplate] = useState<EmailTemplate | null>(null);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    
    // Initialize template when layout is selected
    useEffect(() => {
        if (selectedLayout && !template) {
            // Create a new template or use sample template
            const newTemplate: EmailTemplate = {
                id: uuidv4(),
                name: 'New Email Template',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                layout: selectedLayout as 'single' | 'double',
                blocks: [],
                metadata: {
                    author: 'Current User',
                    isShared: false
                }
            };
            setTemplate(newTemplate);
        }
    }, [selectedLayout, template]);
    
    const toggleLayoutDropdown = () => {
        setShowLayoutDropdown(prev => !prev);
    };
    
    const handleSelectLayout = (layout: string) => {
        setSelectedLayout(layout);
        setShowLayoutDropdown(false);
        console.log(`Selected layout: ${layout}`);
    };
    
    const handleSelectContent = (contentType: string, columnIndex: number) => {
        console.log(`Selected content type: ${contentType} for column: ${columnIndex}`);
        if (!template) return;
        
        // Find the highest order in this column
        const highestOrder = template.blocks
            .filter(block => block.column === columnIndex)
            .reduce((max, block) => Math.max(max, block.order), -1);
        
        // Create a new block based on the content type
        const newBlock = createBlock(contentType as BlockType, columnIndex, highestOrder + 1);
        
        // Add the new block to the template
        setTemplate({
            ...template,
            blocks: [...template.blocks, newBlock],
            updatedAt: new Date().toISOString()
        });
    };
    
    const createBlock = (type: BlockType, column: number, order: number): Block => {
        const baseBlock = {
            id: uuidv4(),
            type,
            column,
            order
        };
        
        switch (type) {
            case 'pre-header':
                return {
                    ...baseBlock,
                    type: 'pre-header',
                    content: 'Pre-header text goes here'
                };
            case 'title':
                return {
                    ...baseBlock,
                    type: 'title',
                    content: 'Title goes here',
                    level: 2,
                    alignment: 'left'
                };
            case 'image-video':
                return {
                    ...baseBlock,
                    type: 'image-video',
                    mediaType: 'image',
                    url: 'https://via.placeholder.com/600x200',
                    alt: 'Placeholder image'
                };
            case 'body-text':
                return {
                    ...baseBlock,
                    type: 'body-text',
                    content: 'Body text goes here. Double-click to edit.',
                    formatting: {
                        alignment: 'left',
                        fontSize: 16
                    }
                };
            case 'table':
                return {
                    ...baseBlock,
                    type: 'table',
                    headers: ['Header 1', 'Header 2', 'Header 3'],
                    rows: [
                        ['Row 1, Cell 1', 'Row 1, Cell 2', 'Row 1, Cell 3'],
                        ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3']
                    ],
                    style: {
                        headerBackground: '#2579FF',
                        headerColor: '#FFFFFF',
                        borderColor: '#E2EAF0',
                        alternateRowBackground: true
                    }
                };
            case 'footer':
                return {
                    ...baseBlock,
                    type: 'footer',
                    content: '© 2025 Your Company. All rights reserved.',
                    includeUnsubscribe: true
                };
            default:
                return {
                    ...baseBlock,
                    type: 'body-text',
                    content: 'Content goes here',
                    formatting: {
                        alignment: 'left',
                        fontSize: 16
                    }
                };
        }
    };
    
    const handleEditBlock = (id: string) => {
        setSelectedBlockId(id);
        console.log(`Editing block: ${id}`);
        // Here you would open a modal or sidebar to edit the block
    };
    
    const handleDeleteBlock = (id: string) => {
        if (!template) return;
        
        // Filter out the block to delete
        const updatedBlocks = template.blocks.filter(block => block.id !== id);
        
        // Update the template
        setTemplate({
            ...template,
            blocks: updatedBlocks,
            updatedAt: new Date().toISOString()
        });
        
        // If the deleted block was selected, clear the selection
        if (selectedBlockId === id) {
            setSelectedBlockId(null);
        }
    };
    
    const handleMoveBlock = (id: string, direction: 'up' | 'down') => {
        if (!template) return;
        
        // Find the block to move
        const blockIndex = template.blocks.findIndex(block => block.id === id);
        if (blockIndex === -1) return;
        
        const blockToMove = template.blocks[blockIndex];
        const { column, order } = blockToMove;
        
        // Get all blocks in the same column, sorted by order
        const columnBlocks = template.blocks
            .filter(block => block.column === column)
            .sort((a, b) => a.order - b.order);
        
        // Find the index of the block in the column
        const columnBlockIndex = columnBlocks.findIndex(block => block.id === id);
        
        // Determine the target index based on direction
        const targetIndex = direction === 'up' ? columnBlockIndex - 1 : columnBlockIndex + 1;
        
        // Check if move is possible
        if (targetIndex < 0 || targetIndex >= columnBlocks.length) return;
        
        // Swap orders with the target block
        const targetBlock = columnBlocks[targetIndex];
        const updatedBlocks = template.blocks.map(block => {
            if (block.id === id) {
                return { ...block, order: targetBlock.order };
            }
            if (block.id === targetBlock.id) {
                return { ...block, order: order };
            }
            return block;
        });
        
        // Update the template
        setTemplate({
            ...template,
            blocks: updatedBlocks,
            updatedAt: new Date().toISOString()
        });
    };
    
    // Load sample template for demo purposes
    const handleLoadSampleTemplate = () => {
        setTemplate(sampleTemplate);
        setSelectedLayout(sampleTemplate.layout);
    };
    
    return (
        <div className={classes.container}>
            <main className={classes.mainContent}>
                <EditorHeader title="New letter" />
                <div className={classes.editorContent}>
                    {!selectedLayout ? (
                        <div className={classes.layoutBox}>
                            <div className={classes.dropdownContainer}>
                                <Button 
                                    onClick={toggleLayoutDropdown}
                                    className={classes.defineLayoutButton}
                                >
                                    <span className={classes.buttonIcon}>+</span>
                                    Define layout
                                </Button>
                                <LayoutDropdown 
                                    isOpen={showLayoutDropdown} 
                                    onClose={toggleLayoutDropdown} 
                                    onSelectLayout={handleSelectLayout} 
                                />
                            </div>
                            <Button 
                                className={classes.loadTemplateButton}
                                onClick={handleLoadSampleTemplate}
                            >
                                <span className={classes.buttonIcon}>↓</span>
                                Load sample template
                            </Button>
                        </div>
                    ) : (
                        <div className={classes.contentContainer}>
                            <div className={classes.editorTools}>
                                <div className={classes.toolsLeft}>
                                    <button className={classes.toolButton}>
                                        <span className={classes.bellIcon}>🔔</span>
                                    </button>
                                    <button className={classes.toolButton}>
                                        <span className={classes.arrowUpIcon}>↑</span>
                                    </button>
                                    <button className={classes.toolButton}>
                                        <span className={classes.arrowDownIcon}>↓</span>
                                    </button>
                                </div>
                                <div className={classes.toolsRight}>
                                    <button className={classes.toolButton}>
                                        <span className={classes.columnsIcon}>|||</span>
                                    </button>
                                    <button className={classes.toolButton}>
                                        <span className={classes.copyIcon}>📋</span>
                                    </button>
                                    <button className={classes.toolButton}>
                                        <span className={classes.trashIcon}>🗑️</span>
                                    </button>
                                </div>
                            </div>
                            <div className={selectedLayout === 'single' ? classes.singleColumnLayout : classes.doubleColumnLayout}>
                                <div className={classes.contentColumn}>
                                    {/* Render blocks for column 0 */}
                                    {template && template.blocks
                                        .filter(block => block.column === 0)
                                        .sort((a, b) => a.order - b.order)
                                        .map(block => (
                                            <BlockRenderer
                                                key={block.id}
                                                block={block}
                                                onEdit={handleEditBlock}
                                                onDelete={handleDeleteBlock}
                                                onMove={handleMoveBlock}
                                                isSelected={selectedBlockId === block.id}
                                            />
                                        ))
                                    }
                                    <AddContentButton 
                                        columnIndex={0}
                                        onSelectContent={handleSelectContent}
                                    />
                                </div>
                                {selectedLayout === 'double' && (
                                    <div className={classes.contentColumn}>
                                        {/* Render blocks for column 1 */}
                                        {template && template.blocks
                                            .filter(block => block.column === 1)
                                            .sort((a, b) => a.order - b.order)
                                            .map(block => (
                                                <BlockRenderer
                                                    key={block.id}
                                                    block={block}
                                                    onEdit={handleEditBlock}
                                                    onDelete={handleDeleteBlock}
                                                    onMove={handleMoveBlock}
                                                    isSelected={selectedBlockId === block.id}
                                                />
                                            ))
                                        }
                                        <AddContentButton 
                                            columnIndex={1}
                                            onSelectContent={handleSelectContent}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className={classes.addBlockWrapper}>
                        <Button>
                            <span className={classes.buttonIcon}>+</span>
                            Add block
                        </Button>
                    </div>
                </div>
            </main>
            {/* ContentDropdown is now inside AddContentButton component */}
        </div>
    );
};
