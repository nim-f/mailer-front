import { User } from "../types/User";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "./UserContext";
import Cookies from "js-cookie";

async function getUser(): Promise<User> {
    const response = await fetch(
        "https://2x4g1ehzrc.execute-api.us-east-1.amazonaws.com/Prod/getuser/",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("IdToken")}`,
            },
        }
    );
    if (!response.ok) {
        throw new Error("Failed on sign in request");
    }

    const jsonResponse = await response.json();
    return jsonResponse;
}
type UserProviderProps = {
    children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    // fetch user with tanstack react-query
    const {
        data: user,
        isFetching,
        error,
    } = useQuery({
        queryKey: ["user", 1],
        queryFn: getUser,
        retry: 0,
    });

    console.log({ user });
    if (isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={{ user, error }}>
            {children}
        </UserContext.Provider>
    );
};
