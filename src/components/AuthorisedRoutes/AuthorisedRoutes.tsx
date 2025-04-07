import { Route, Routes } from "react-router";
import { SideNav } from "../SideNav";
import { Home } from "../../routes/home";
import classes from "./authorised_routes.module.css";

export const AuthorisedRoutes = () => {
    return (
        <div className={classes.layout}>
            <SideNav />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
};
