import { User } from "../types/User";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "./UserContext";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// TODO: Move this to environment variable (REACT_APP_API_URL)
const API_URL = "https://o1muw8cjaa.execute-api.us-east-1.amazonaws.com/dev";

async function getUser(): Promise<{
    userId: string;
    email: string;
    name: string;
}> {
    const response = await fetch(
        `${API_URL}/profile`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("idToken")}`,
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
    const { data, error } = useQuery({
        queryKey: ["user", 1],
        queryFn: getUser,
        retry: 0,
    });

    const [user, setUser] = useState<User | undefined>(
        data
            ? {
                  email: data.email,
                  name: data.name,
              }
            : undefined
    );

    useEffect(() => {
        if (data) {
            setUser({ email: data.email, name: data.name });
        }
    }, [data]);

    console.log({ user });
    // if (isFetching) {
    //     return <div>Loading...</div>;
    // }

    return (
        <UserContext.Provider value={{ user, error, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
