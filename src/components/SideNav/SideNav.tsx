import { Link, useLocation } from "react-router";
import classes from "./SideNav.module.css";
import { User } from "../User/User";
import TextInput from "../TextInput/TextInput";
export const SideNav = () => {
    const location = useLocation();
    const isEditorPage = location.pathname === "/editor";
    
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
            
            {isEditorPage && (
                <div className={classes.lettersSection}>
                    <TextInput value="" onChange={() => {}} placeholder="Label" />
                    <div className={classes.lettersList}>
                        <div className={classes.lettersTitle}>YOUR LETTERS</div>
                        <div className={classes.letterItem + ' ' + classes.letterActive}>
                            <div>29 Jan 2025</div>
                            <div>New letter</div>
                        </div>
                        <div className={classes.letterItem}>
                            <div>25 Jan 2025</div>
                            <div>Maximizing Leads (Strat.)</div>
                        </div>
                        <div className={classes.letterItem}>
                            <div>25 Jan 2025</div>
                            <div>Innovative Sales and Marketing Strategies to Dr...</div>
                        </div>
                        <div className={classes.letterItem}>
                            <div>25 Jan 2025</div>
                            <div>Driving Engagement Through Personalization T...</div>
                        </div>
                    </div>
                    <div className={classes.sharedTitle}>SHARED WITH YOU</div>
                </div>
            )}
        </div>
    );
};
