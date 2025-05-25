import { Login } from "../../components/Login";
import mailImg from "../../assets/mail_pic.png";

import classes from "./auth.module.css";
import Button from "../../components/Button/Button";

export const Auth = () => {
    return (
        <div className={classes.auth}>
            <div className={`${classes.auth__intro} ${classes.auth__column}`}>
                <div className={classes.auth__block}>
                    <div>
                        <img src={mailImg} alt="Mail" />
                    </div>
                    <h1>Create and manage email campaigns easily</h1>
                    <p>Bla-bla-bla, try Mailer for free</p>

                    <Button>Learn more</Button>
                </div>
            </div>
            <div className={classes.auth__column}>
                <div className={classes.auth__block}>
                    <h2>Sign in</h2>
                    <Login />
                </div>
            </div>
        </div>
    );
};
