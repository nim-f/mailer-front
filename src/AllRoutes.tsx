import { BrowserRouter, Route, Routes } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Auth } from "./routes/Auth/Auth";
import { AuthorisedRoutes } from "./components/AuthorisedRoutes/AuthorisedRoutes";
import { NewEmail } from "./routes/Emails/new/NewEmail";

export const RoutesComponent = () => {
    const { user, error } = useContext(UserContext);
    console.log("user", user);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="*"
                    element={<ProtectedRoute user={user} error={error} />}
                >
                    <Route path="*" element={<AuthorisedRoutes />} />
                </Route>
                <Route path="/login" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
};
