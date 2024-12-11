import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '@radix-ui/themes/styles.css';
import { HelloMeteors } from './hello/HelloMeteors';
import { Header } from './header/Header';
import { Theme } from '@radix-ui/themes';
import './output.css';
import PixiMeteorParticles from './meteors/Meteors';
import { MeteorDetailPage } from './meteor-information/MeteorDetailPage';

const App: React.FC = () => {
    return (
        <Theme accentColor="violet" radius="full" appearance="dark" className="bg-transparent">
            <div className="bg-gradient-to-b from-[#00121F] to-[#0D0316] relative -z-10">
                <Routes>
                    <Route path="/" element={withLayout(<HelloMeteors />)}></Route>
                    <Route path="/:sstr" element={withLayout(<MeteorDetailPage />)}></Route>
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
                <PixiMeteorParticles meteorType="E" />
            </div>
            <header className="fixed">{header}</header>
            <div className="page">{element}</div>
        </div>
    );
};

export default App;
