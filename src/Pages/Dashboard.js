import React, { useState, useEffect } from 'react';
import NavHeader from '../Components/NavHeader';
import FeedCard from '../Components/FeedCard';
import SideMenu from '../Components/SideMenu';
import { PageStyle } from '../Common/CardStyles';
import { UserContext } from '../Contexts/UserContext';
import HttpClient from '../HttpClient';
import CreateFeed from '../Components/CreateFeed';
import ChatBox from '../Components/ChatBox';

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        getFeeds();
        getFriends();
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

    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);

    const getFriends = async () => {
        const response = await HttpClient.get(`api/user/my-connections/all/${user.id}`);
        const { data } = await response.data;
        const pending = data.filter(item => item.status === 1 && item.isRequestor === false);
        const all = data.filter(item => item.status === 2);
        setRequests(pending);
        setFriends(all);
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
                                <h3 className='font-bold text-slate-400 text-sm mb-4'>New Updates</h3>
                                <CreateFeed user={user} onCreateFeed={onCreateFeed} />
                                {
                                    posts && posts.length > 0
                                        ? posts.map(post => (
                                            <FeedCard
                                                key={post._id}
                                                user={user}
                                                post={post}
                                                deleteFeed={deleteFeed}
                                                updateLike={updateLike} />
                                        ))
                                        : <p className='text-sm text-slate-300 py-4'>
                                            No posts yet.
                                        </p>
                                }
                            </div>
                        </div>
                        <div className='columns-xl'>
                            <ChatBox friends={friends} requests={requests}/>
                        </div>
                    </div>
                </React.Fragment>)}
        </UserContext.Consumer>
    )
}

export default Dashboard
