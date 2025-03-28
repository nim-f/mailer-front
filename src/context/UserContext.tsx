import { createContext } from "react";
import { User } from "../types/User";

export const UserContext = createContext<{
    user?: User;
    error?: Error | null;
}>({
    user: undefined,
    error: undefined,
});
