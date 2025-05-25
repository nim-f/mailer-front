import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import classes from "./home.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";

export const Home = () => {
    const { user } = useContext(UserContext);
    console.log({ user });
    const navigate = useNavigate();
    return (
        <div className={classes.home_intro}>
            <h1>Welcome back, {user?.email}</h1>

            <div className={classes.home_intro__button}>
                <Button
                    className="button-solid"
                    onClick={() => navigate("/editor")}
                >
                    Start new email
                </Button>
            </div>

            <div>
                <Button className="button-transparent">Load template</Button>
            </div>
        </div>
    );
};
