import { BrowserRouter, Route, Routes } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Auth } from "./routes/home/Auth/Auth";
import { AuthorisedRoutes } from "./components/AuthorisedRoutes/AuthorisedRoutes";

export const RoutesComponent = () => {
    const { user, error } = useContext(UserContext);
    console.log("user", user);
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute user={user} error={error} />}>
                    <Route path="/" element={<AuthorisedRoutes />} />
                </Route>
                <Route path="/login" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
};
