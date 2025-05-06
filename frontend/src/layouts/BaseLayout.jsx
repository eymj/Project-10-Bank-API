import { Outlet } from 'react-router';

import MainNavigation from '../components/MainNavigation';

export default function BaseLayout() {
    return (
        <>
            <MainNavigation />
            <Outlet />
            <footer className="footer">
                <p className="footer-text">Copyright 2020 Argent Bank</p>
            </footer>
        </>
    );
};