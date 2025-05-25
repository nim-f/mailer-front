import Button from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import classes from "./editorHeader.module.css";

interface EditorHeaderProps {
    title: string;
}

export const EditorHeader = ({ title }: EditorHeaderProps) => {
    return (
        <div className={classes.editor_header}>
            <div className={classes.editor_header__title}>
                <h1>{title}</h1>
                <Dropdown items={[]}></Dropdown>
            </div>

            <div>
                <Button>
                    Save
                    </Button>
                <Button>Preview</Button>
                <Button>Close</Button>
            </div>
        </div>
    );
};
