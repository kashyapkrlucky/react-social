import React from 'react';
import NavHeader from '../Components/NavHeader';
import SideMenu from '../Components/SideMenu';
import { PageStyle } from '../Common/CardStyles';
import { UserContext } from '../Contexts/UserContext';
import HttpClient from '../HttpClient';

function Groups() {
    return (
        <UserContext.Consumer>
            {({ user, setUser }) => (
                <React.Fragment>
                    <NavHeader />
                    <div className="flex flex-row min-w-full py-8" style={PageStyle}>
                        <div className='columns-xl'>
                            <SideMenu />
                        </div>
                        <div className='columns-auto w-full'>
                        </div>
                        <div className='columns-xl'>
                        </div>
                    </div>
                </React.Fragment>)}
        </UserContext.Consumer>
    )
}

export default Groups
