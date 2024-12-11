import React from "react";
import { Route, Routes } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { HelloMeteors } from "./hello/HelloMeteors";
import { Header } from "./header/Header";
import { Theme } from "@radix-ui/themes";
import "./output.css";
import PixiMeteorParticles from "./meteors/Meteors";

const App: React.FC = () => {
    return (
        <Theme accentColor="violet" radius="full" appearance="dark" className="bg-transparent">
            <div className="bg-gradient-to-b from-[#24192E] to-[#00111C] relative -z-10">
                <Routes>
                    <Route path="/" element={withLayout(<HelloMeteors />)}></Route>
                </Routes>
            </div>
        </Theme>
    );
};

const header = <Header />;

const withLayout = (element: React.ReactNode) => {
    return (
        <div className="route">
            <div className="fixed w-full h-full top-0 left-0">
                <PixiMeteorParticles />
            </div>
            {header}
            <div className="page">{element}</div>
        </div>
    );
};

export default App;
