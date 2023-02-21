import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import HttpClient from '../HttpClient';
import { useParams } from 'react-router';
import ConnectionStatus from '../Components/ConnectionStatus';
import Moment from 'react-moment';
import UpdatePicture from '../Components/UpdatePicture';
import Layout from './Layout';
import Cards from '../Common/Cards';
import ProfileCard from '../Components/ProfileCard';

function Profile() {
    let { userId } = useParams();
    const { user, setUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({
        avatar: '',
        created_at: '',
        email: '',
        name: '',
        posts: [],
        profile: {}
    });
    const [connStatus, setConnStatus] = useState(0);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const getFullProfile = async (id) => {
        setIsEditOpen(false);
        const response = await HttpClient.get(`api/user/profile/full/${id}`);
        const { data } = await response.data;
        setUserInfo(data);
        // if(!userId) {
        //     setUser({ ...user, avatar: data.avatar })
        // }
    }

    const getIsConnected = async (userId) => {
        const connection = {
            from: user.id,
            to: userId
        };
        const response = await HttpClient.post(`api/user/is-connected`, connection);
        const { data } = await response.data;
        setConnStatus(data.status);
    }

    const addConnection = async () => {
        const connection = {
            from: user.id,
            to: userInfo._id
        };
        const response = await HttpClient.post(`api/user/request-connection`, connection);
        if (response.status) {
            getIsConnected(userId);
        }
    }

    const updateProfile = async () => {
        await getFullProfile(user.id);
    }

    useEffect(() => {
        if(userId) {
            getFullProfile(userId);
            getIsConnected(userId);
        } else {
            getFullProfile(user.id);
        }
        return () => { };
    }, [userId]);
    return (
        <Layout>
            <div className='columns-auto w-full'>
                <Cards className='flex flex-row bg-white p-10 radius-4 mb-4'>
                    <div className='flex flex-row pr-4 w-40'>
                        <UpdatePicture user={userInfo} updateProfile={updateProfile} />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <h3 className='text-2xl'>{userInfo.name}</h3>
                        {
                            (userId && userId !== user._id)
                                ?
                                <ConnectionStatus status={connStatus} addConnection={addConnection} />
                                :
                                (<p>Me</p>)
                        }
                        {
                            userInfo.profile
                            &&

                            (<div>
                                <p>{userInfo.profile.tagline}</p>
                                <p>{userInfo.profile.city + ' ' + userInfo.profile.country}</p>
                            </div>)
                        }

                    </div>
                    {
                        !userId
                        &&
                        <div className='flex flex-row items-start w-40'>
                            <button className='bg-purple-700 text-white radius-4 px-4 py-2' onClick={() => setIsEditOpen(true)}>Edit Profile</button>
                        </div>
                    }
                </Cards>

                {isEditOpen && <ProfileCard user={userInfo} updateProfile={updateProfile} setIsEditOpen={setIsEditOpen} />}

                <div className='flex flex-col gap-2'>
                    {
                        userInfo.posts && userInfo.posts.length > 0
                            ? (
                                userInfo.posts.map(post => (
                                    <Cards className='flex flex-col bg-white p-4 radius-4' key={post._id}>
                                        <h3 className='font-medium'>
                                            {post.description}
                                        </h3>
                                        <p className='text-xs text-slate-400'><Moment fromNow>{post.created_at}</Moment></p>
                                    </Cards>
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
        </Layout>
    )
}

export default Profile
