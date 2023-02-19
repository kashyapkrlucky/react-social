import React from 'react';

import NavHeader from '../Components/NavHeader';
import SideMenu from '../Components/SideMenu';
import { PageStyle } from '../Common/CardStyles';

function Layout({ children }) {
    return (
        <React.Fragment>
            <NavHeader />
            <div className="flex flex-row min-w-full py-8" style={PageStyle}>
                <div className='columns-xl'>
                    <SideMenu />
                </div>
                {children}
            </div>
        </React.Fragment>
    )
}

export default Layout
