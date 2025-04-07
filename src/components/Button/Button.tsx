import React from "react";
import classes from "./button.module.css";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
    style?: React.CSSProperties;
    active?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    disabled = false,
    className,
    style,
    type = "button",
    active = false,
}) => {
    let additionalClass = className ? classes[className] : "";

    if (active) {
        additionalClass = additionalClass + " " + classes.active;
    }

    return (
        <button
            style={style}
            onClick={onClick}
            disabled={disabled}
            className={classes.button + " " + additionalClass}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
