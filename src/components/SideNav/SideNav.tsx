import { Link } from "react-router";
import classes from "./SideNav.module.css";
import { User } from "../User/User";
export const SideNav = () => {
    return (
        <div className={classes.sidenav}>
            <User />

            <div className={classes.sidenav__menu}>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/emails">Emails</Link>
                    </li>
                    <li>
                        <Link to="/templates">Templates</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
