import { EditorHeader } from "../../components/EditorHeader/EditorHeader";
import Button from "../../components/Button/Button";
import classes from "./Editor.module.css";
import { useState } from "react";
import LayoutDropdown from "../../components/LayoutDropdown";

export const Editor = () => {
    const [showLayoutDropdown, setShowLayoutDropdown] = useState(false);
    const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
    
    // Display a different message based on the selected layout
    const layoutMessage = selectedLayout 
        ? `Current layout: ${selectedLayout === 'single' ? 'Single column' : 'Double columns'}` 
        : 'No layout selected';
    
    const toggleLayoutDropdown = () => {
        setShowLayoutDropdown(prev => !prev);
    };
    
    const handleSelectLayout = (layout: string) => {
        setSelectedLayout(layout);
        setShowLayoutDropdown(false);
        console.log(`Selected layout: ${layout}`);
    };
    
    return (
        <div className={classes.container}>
            <main className={classes.mainContent}>
                <EditorHeader title="New letter" />
                <div className={classes.editorContent}>
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
                            {selectedLayout && (
                                <div className={classes.selectedLayoutIndicator}>
                                    {layoutMessage}
                                </div>
                            )}
                        </div>
                        <Button className={classes.loadTemplateButton}>
                            <span className={classes.buttonIcon}>↓</span>
                            Load template
                        </Button>
                    </div>
                    <div className={classes.addBlockWrapper}>
                        <Button>
                            <span className={classes.buttonIcon}>+</span>
                            Add block
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};
