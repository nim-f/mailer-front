import { useState } from "react";
import classes from "./dropdown.module.css";
import moreIcon from "../../assets/more.svg";
import Button from "../Button/Button";
import { DropdownList } from "../Dropdown/DropdownList";
import { DropdownProps } from "./types";
import { useClickOutside } from "../../hooks/useClickOutside";

export const Dropdown = ({ items }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClickOutside = () => {
        setIsOpen(false);
    };
    const ref = useClickOutside(handleClickOutside);

    return (
        <div className={classes.dropdown} ref={ref}>
            <Button
                active={isOpen}
                style={{ padding: 6 }}
                className={"button-image"}
                onClick={() => setIsOpen(!isOpen)}
            >
                <img src={moreIcon} />
            </Button>
            <DropdownList isOpen={isOpen} items={items} />
        </div>
    );
};
