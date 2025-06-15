import { Navigate, Outlet } from "react-router";
import { User } from "../../types/User";

type ProtectedRouteProps = {
    user: User | undefined;
    error: Error | null | undefined;
};

export const ProtectedRoute = ({ error }: ProtectedRouteProps) => {

    console.log({error})
    if (error) {
        return (
            <>
                <Navigate to="/login" replace />
            </>
        );
    }

    return <Outlet />;
};
