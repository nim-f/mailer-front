import { Link } from "react-router";
import classes from "./SideNav.module.css";
export const SideNav = () => {
    return (
        <div className={classes.sidenav}>
            <h1>SideNav</h1>
            <Link to="/qwe">Home</Link>
        </div>
    );
};
