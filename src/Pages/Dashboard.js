import React from 'react'
import NavHeader from '../Common/NavHeader';
import { PageStyle } from '../Common/CardSizes';
import ProfileCard from '../Components/ProfileCard';
import FeedCard from '../Components/FeedCard';
import { Avatars } from '../Utils';
import { UserContext } from '../Contexts/UserContext';
import SideMenu from '../Components/SideMenu';

function Dashboard() {
    return (
        <UserContext.Consumer>
            {({ user, setUser }) => (
                <React.Fragment>
                    <NavHeader />
                    <div className="flex flex-row min-w-full py-8" style={PageStyle}>
                        <div className='columns-sm'>
                            <SideMenu />
                        </div>
                        <div className='columns-auto w-full'>
                            <FeedCard user={user} />
                        </div>
                        <div className='columns-sm'>
                            {/* {
                                Avatars.map(avatar => (
                                    <img key={avatar.name} src={'avatars/' + avatar.url} alt={avatar.name} />
                                ))
                            } */}
                        </div>
                    </div>
                </React.Fragment>)}
        </UserContext.Consumer>
    )
}

export default Dashboard
