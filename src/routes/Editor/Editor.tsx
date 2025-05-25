import { EditorHeader } from "../../components/EditorHeader/EditorHeader";
import Button from "../../components/Button/Button";
import classes from "./Editor.module.css";
import { useState } from "react";
import LayoutDropdown from "../../components/LayoutDropdown";
import AddContentButton from "../../components/AddContentButton";

export const Editor = () => {
    const [showLayoutDropdown, setShowLayoutDropdown] = useState(false);
    const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
    
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
        // Here you would add the content to the appropriate column
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
                            <Button className={classes.loadTemplateButton}>
                                <span className={classes.buttonIcon}>↓</span>
                                Load template
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
                                    <AddContentButton 
                                        columnIndex={0}
                                        onSelectContent={handleSelectContent}
                                    />
                                </div>
                                {selectedLayout === 'double' && (
                                    <div className={classes.contentColumn}>
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
