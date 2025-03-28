import { Navigate, Outlet } from "react-router";
import { User } from "../../types/User";

type ProtectedRouteProps = {
    user: User | undefined;
    error: string | null | undefined;
};

export const ProtectedRoute = ({ user, error }: ProtectedRouteProps) => {
    if (!user && error) {
        return (
            <>
                <Navigate to="/login" replace />
            </>
        );
    }

    return <Outlet />;
};
