import React from "react";
import classes from "./textinput.module.css";

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    name?: string;
    type?: string;
}

const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
    placeholder,
    disabled,
    type,
}) => {
    return (
        <div className={classes.textinput__container}>
            <input
                type={type || "text"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={classes.textinput}
            />
        </div>
    );
};

export default TextInput;
