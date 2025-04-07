import { Link } from "react-router";
import { DropdownItem } from "./types";
import classes from "./dropdownlist.module.css";

export const DropdownList = ({
    items,
    isOpen,
}: {
    items: DropdownItem[];
    isOpen: boolean;
}) => {
    return (
        <ul
            className={classes.dropdownlist}
            style={{ display: isOpen ? "block" : "none" }}
        >
            {items.map((item) => (
                <li key={item.value} className="dropdown-item">
                    <Link to={item.value}>{item.label}</Link>
                </li>
            ))}
        </ul>
    );
};
