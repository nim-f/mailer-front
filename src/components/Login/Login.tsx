import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import { UserContext } from "../../context/UserContext";

type User = {
    AccessToken: string;
    ExpiresIn: number;
    IdToken: string;
    RefreshToken: string;
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
        "https://2x4g1ehzrc.execute-api.us-east-1.amazonaws.com/Prod/auth/",
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
        ...jsonResponse.response.AuthenticationResult,
        email: jsonResponse.response.email,
    };
}

export const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const { mutate: signInMutation } = useMutation<
        User,
        unknown,
        { email: string; password: string },
        unknown
    >({
        mutationFn: signIn,
        onSuccess: (data: User) => {
            console.log("User signed in", data);
            Cookies.set("IdToken", data.IdToken, {
                expires: data.ExpiresIn,
            });
            Cookies.set("RefreshToken", data.RefreshToken, {
                expires: data.ExpiresIn,
            });
            setUser?.({ email: data.email });
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
