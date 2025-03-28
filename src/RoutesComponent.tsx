import { BrowserRouter, Route, Routes } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./components/Login";
import { Home } from "./routes/home";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { SideNav } from "./components/SideNav";

export const RoutesComponent = () => {
    const { user, error } = useContext(UserContext);
    return (
        <BrowserRouter>
            <div className="layout">
                <SideNav />
                <Routes>
                    <Route
                        element={<ProtectedRoute user={user} error={error} />}
                    >
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};
