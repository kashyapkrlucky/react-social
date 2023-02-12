import React, { useState, useEffect } from 'react';
import NavHeader from '../Components/NavHeader';
import FeedCard from '../Components/FeedCard';
import SideMenu from '../Components/SideMenu';
import { PageStyle } from '../Common/CardStyles';
import { UserContext } from '../Contexts/UserContext';
import HttpClient from '../HttpClient';
import CreateFeed from '../Components/CreateFeed';

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        getFeeds();
        return () => { console.log('Clearing Feeds') };
    }, []);
    const getFeeds = async () => {
        const response = await HttpClient.get(`api/post/recent/${user.id}`);
        const { data } = await response.data;
        setPosts(data);
    }
    const onCreateFeed = async (payload) => {
        const response = await HttpClient.post(`api/post/create`, payload);
        if (response.status) {
            getFeeds();
        }
    }
    const deleteFeed = async (id) => {
        const response = await HttpClient.delete(`api/post/remove/${id}`, {});
        if (response.status) {
            getFeeds();
        }
    }
    const updateLike = async (payload) => {
        const response = await HttpClient.post(`api/post/like/update`, payload);
        if (response.status) {
            getFeeds();
        }
    }
    
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
                            <div className="flex flex-col">
                                <CreateFeed user={user} onCreateFeed={onCreateFeed} />
                                {
                                    posts.map(post => (
                                        <FeedCard
                                            key={post._id}
                                            user={user}
                                            post={post}
                                            deleteFeed={deleteFeed}
                                            updateLike={updateLike} />
                                    ))
                                }
                            </div>
                        </div>
                        <div className='columns-xl'>
                        </div>
                    </div>
                </React.Fragment>)}
        </UserContext.Consumer>
    )
}

export default Dashboard
