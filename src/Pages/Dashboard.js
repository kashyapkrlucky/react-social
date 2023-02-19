import React, { useState, useEffect, useContext } from 'react';
import Layout from './Layout';
import { UserContext } from '../Contexts/UserContext';
import HttpClient from '../HttpClient';
import FeedCard from '../Components/FeedCard';
import CreateFeed from '../Components/CreateFeed';
import ChatPanel from '../Components/ChatPanel';

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const { id: userId, user } = useContext(UserContext);
    useEffect(() => {
        getFeeds();
        getFriends();
        return () => { };
    }, []);
    const getFeeds = async () => {
        const response = await HttpClient.get(`api/post/recent/${userId}`);
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

    const getFriends = async () => {
        const response = await HttpClient.get(`api/user/my-connections/all/${userId}`);
        const { data } = await response.data;
        const pending = data.filter(item => item.status === 1 && item.isRequestor === false);
        const all = data.filter(item => item.status === 2);
        setRequests(pending);
        setFriends(all);
    }

    return (
        <Layout>
            <div className='columns-auto w-full'>
                <div className="flex flex-col">
                    <h3 className='text-slate-700 text-sm mb-4'>New Updates</h3>
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
                <ChatPanel user={user} friends={friends} requests={requests} />
            </div>
        </Layout>
    )
}

export default Dashboard
