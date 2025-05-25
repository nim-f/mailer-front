import { Route, Routes } from "react-router";
import { SideNav } from "../SideNav";
import { Home } from "../../routes/Home";
import classes from "./authorised_routes.module.css";
import { NewEmail } from "../../routes/Emails/new/NewEmail";

export const AuthorisedRoutes = () => {
    return (
        <div className={classes.layout}>
            <SideNav />
            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="emails/new" element={<NewEmail />} />
                </Routes>
            </div>
        </div>
    );
};
