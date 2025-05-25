import { Route, Routes } from "react-router";
import { SideNav } from "../SideNav";
import { Home } from "../../routes/Home";
import classes from "./authorised_routes.module.css";
import { Editor } from "../../routes/Editor";

export const AuthorisedRoutes = () => {
    return (
        <div className={classes.layout}>
            <SideNav />
            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="editor" element={<Editor />} />
                    <Route path="editor/:templateId" element={<Editor />} />
                </Routes>
            </div>
        </div>
    );
};
