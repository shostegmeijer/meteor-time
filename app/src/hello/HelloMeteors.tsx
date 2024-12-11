import { Button } from "@radix-ui/themes";
import { useApi } from "../api/useApi";
import { useEffect, useState } from "react";
import { MeteorInformation } from "../meteor-information/MeteorInformation";

export const HelloMeteors = () => {
    const { fetchShowers } = useApi();
    const [showers, setShowers] = useState<string>();

    useEffect(() => {
        (async () => {
            const { greeting } = await fetchShowers();
            setShowers(greeting);
        })();
    }, []);

    return (
        <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
            <h1 className="flex text-4xl font-black">Next meteor shower is in:</h1>
            <MeteorInformation />
        </div>
    );
};
