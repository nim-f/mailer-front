import { createContext } from "react";
import { User } from "../types/User";

export const UserContext = createContext<{
    user?: User;
    error?: Error | null;
    setUser?: (user: User) => void;
}>({
    user: undefined,
    error: undefined,
    setUser: undefined,
});
