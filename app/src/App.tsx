import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { HelloWorld } from "./hello/HelloWorld";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";

const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={withLayout(<HelloWorld />)}></Route>
            </Routes>
        </div>
    );
};

const header = <Header />;
const footer = <Footer />;

const withLayout = (element: React.ReactNode) => {
    return (
        <div className="route">
            {header}
            <div className="page">{element}</div>
            {footer}
        </div>
    );
};

export default App;
