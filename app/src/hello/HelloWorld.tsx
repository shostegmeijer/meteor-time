import { useEffect, useState } from "react";
import { useApi } from "../api/useApi";

export const HelloWorld: React.FC = () => {
    const { fetchHelloWorld } = useApi();
    const [greeting, setGreeting] = useState<string>();

    useEffect(() => {
        (async () => {
            const { greeting } = await fetchHelloWorld();
            setGreeting(greeting);
        })();
    }, []);

    return (
        <div>
            <h1>{greeting}</h1>
        </div>
    );
};
