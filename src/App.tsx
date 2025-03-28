import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/UserProvider";
import { RoutesComponent } from "./RoutesComponent";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <RoutesComponent />
                </UserProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
