import React, { useState, useEffect, useContext } from 'react';
import NavHeader from '../Components/NavHeader';
import { PageStyle } from '../Common/CardStyles';
import { UserContext } from '../Contexts/UserContext';
import HttpClient from '../HttpClient';
import { useParams } from 'react-router';
import ConnectionStatus from '../Components/ConnectionStatus';
import Moment from 'react-moment';

function Profile() {
    let { userId } = useParams();
    const context = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({});
    const [connStatus, setConnStatus] = useState(0);
    const getFullProfile = async (id) => {
        const response = await HttpClient.get(`api/user/profile/${id}`);
        const { data } = await response.data;
        setUserInfo(data);
    }

    const getIsConnected = async (userId) => {
        const connection = {
            from: context.user.id,
            to: userId
        };
        const response = await HttpClient.post(`api/user/is-connected`, connection);
        const { data } = await response.data;
        setConnStatus(data.status);
    }

    const addConnection = async () => {
        const connection = {
            from: context.user.id,
            to: userInfo._id
        };
        const response = await HttpClient.post(`api/user/request-connection`, connection);
        if (response.status) {
            getIsConnected(userId);
        }
    }

    useEffect(() => {
        getFullProfile(userId || context.user.id);
        getIsConnected(userId);
        return () => {
            console.log('d');
        };
    }, [userId]);
    return (
        <React.Fragment>
            <NavHeader />
            <div className="flex flex-row min-w-full py-8" style={PageStyle}>
                <div className='columns-xl'>

                </div>
                <div className='columns-auto w-full'>
                    <div className='flex flex-row bg-white p-10 shadow-md radius-4 mb-4'>
                        <div className='flex flex-row pr-4'>
                            <img
                                className={"w-24 w-24 rounded-full "}
                                src={"/avatars/" + userInfo.avatar}
                                alt={userInfo.name}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-2xl'>{userInfo.name}</h3>
                            {
                                (userId && userId !== context.user.id)
                                    ?
                                    <ConnectionStatus status={connStatus} addConnection={addConnection} />
                                    :
                                    (<p>Me</p>)
                            }

                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {
                            userInfo.posts && userInfo.posts.length > 0
                                ? (
                                    userInfo.posts.map(post => (
                                        <div className='flex flex-col bg-white p-4 shadow-md radius-4' key={post._id}>
                                            <h3 className='font-medium'>
                                                {post.description}
                                            </h3>
                                            <p className='text-xs text-slate-400'><Moment fromNow>{post.created_at}</Moment></p>
                                        </div>
                                    ))
                                )
                                : (
                                    <p className='text-sm text-slate-300 py-4'>
                                        No posts yet.
                                    </p>
                                )
                        }
                    </div>
                </div>
                <div className='columns-xl'>
                </div>
            </div>
        </React.Fragment>

    )
}

export default Profile
