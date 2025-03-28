import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

type User = {
    AccessToken: string;
    ExpiresIn: number;
    IdToken: string;
    RefreshToken: string;
    TokenType: string;
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
    return jsonResponse.response.AuthenticationResult;
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
            Cookies.set("IdToken", data.IdToken, {
                expires: data.ExpiresIn,
            });
            Cookies.set("RefreshToken", data.RefreshToken, {
                expires: data.ExpiresIn,
            });
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
            <h4>Login</h4>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    signInMutation({ email, password });
                }}
            >
                <div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <button>Login</button>
            </form>
        </div>
    );
};
