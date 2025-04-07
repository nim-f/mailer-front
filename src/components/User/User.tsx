import { useContext } from "react";
import userIcon from "../../assets/user_icon.png";
import { UserContext } from "../../context/UserContext";
import classes from "./user.module.css";
import { Dropdown } from "../Dropdown/Dropdown";

export const User = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return null; // or a loading spinner, or any other fallback UI
    }
    return (
        <div className={classes.user}>
            <div className={classes.user__avatar}>
                <img src={userIcon} alt="User Avatar" />
            </div>
            <div className={classes.user__info}>
                <h4>{user.email}</h4>
                <div className={classes.user__role}>Administrator</div>
            </div>
            <Dropdown
                items={[
                    { value: "/preferences", label: "Preferences" },
                    { value: "/logout", label: "Logout" },
                    { value: "/about", label: "About" },
                ]}
            />
        </div>
    );
};
