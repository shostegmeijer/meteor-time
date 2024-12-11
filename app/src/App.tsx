import React from "react";
import { Route, Routes } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { HelloMeteors } from "./hello/HelloMeteors";
import { Header } from "./header/Header";
import { Theme } from "@radix-ui/themes";
import "./output.css";

const App: React.FC = () => {
    return (
        <div className="App">
            <Theme accentColor="violet" radius="full" appearance="dark">
                <Routes>
                    <Route path="/" element={withLayout(<HelloMeteors />)}></Route>
                </Routes>
            </Theme>
        </div>
    );
};

const header = <Header />;

const withLayout = (element: React.ReactNode) => {
    return (
        <div className="route">
            {header}
            <div className="page">{element}</div>
        </div>
    );
};

export default App;
