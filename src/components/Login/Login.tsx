import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";

// TODO: Move this to environment variable (REACT_APP_API_URL)
const API_URL = "https://o1muw8cjaa.execute-api.us-east-1.amazonaws.com/dev";

type User = {
    accessToken: string;
    idToken: string;
    refreshToken: string;
    TokenType: string;
    email: string;
};

async function signIn({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<User> {
    console.log({ email, password });
    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            // credentials: "include",
        }
    );
    if (!response.ok) throw new Error("Failed on sign in request");

    const jsonResponse = await response.json();
    return {
        ...jsonResponse.tokens
    };
}

export const Login = () => {
    const navigate = useNavigate();
    const { mutate: signInMutation } = useMutation<
        User,
        unknown,
        { email: string; password: string },
        unknown
    >({
        mutationFn: signIn, 
        onSuccess: (data: User) => {
            console.log("User signed in", data);
            Cookies.set("idToken", data.idToken);
            Cookies.set("refreshToken", data.refreshToken);
            navigate("/");
        },
        onError: (error: unknown) => {
            console.error("Failed to sign in", error);
        },
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    signInMutation({ email, password });
                }}
            >
                <div>
                    <TextInput
                        value={email}
                        onChange={(e) => setEmail(e)}
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <TextInput
                        value={password}
                        onChange={(e) => setPassword(e)}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <Button
                    type="submit"
                    style={{ width: "100%" }}
                    className="button-solid"
                >
                    Sign in
                </Button>
            </form>
        </div>
    );
};
