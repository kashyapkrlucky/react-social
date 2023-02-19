import React, { useContext, useState, useEffect } from 'react';
import Cards from '../Common/Cards';
import { UserContext } from '../Contexts/UserContext';
import HttpClient from '../HttpClient';
import Layout from './Layout';

function Friends() {
    const { id: currentUserId } = useContext(UserContext);
    const [friends, setFriends] = useState([]);

    const getFriends = async () => {
        const response = await HttpClient.get(`api/user/my-connections/all/${currentUserId}`);
        const { data } = await response.data;
        setFriends(data);
    }

    const updateConnection = async (id, status) => {
        const response = await HttpClient.put(`api/user/connection/update`, { id, status });
        if (response.status) {
            getFriends();
        }
    }
    useEffect(() => {
        getFriends();
        return () => { };
    }, []);
    return (
        <Layout>
            <div className='columns-auto w-full'>
                <h3 className='text-xl text-slate-600 mb-2 font-light'>My Friends</h3>
                <Cards className='flex flex-col gap-4'>
                    {
                        friends.map(item => (
                            <div className='flex flex-row justify-between bg-white p-4' key={item.id}>
                                <div className='flex flex-row items-center gap-4'>
                                    <img
                                        className={"w-16 w-16 rounded-full "}
                                        src={"/avatars/" + item.avatar}
                                        alt={item.name}
                                    />
                                    <h3 className='text-xl'>{item.name}</h3>
                                </div>
                                <div className='flex flex-row items-center gap-4'>
                                    {
                                        item.status === 2
                                            ?
                                            <p className='text-blue-500 font-medium text-xs'>Friends</p>
                                            :
                                            (
                                                item.isRequestor
                                                    ? <div className='flex flex-row gap-4 items-center'>
                                                        <p className='text-slate-500 text-xs'>Pending</p>
                                                        <button className='bg-red-500 text-white text-xs px-4 py-1 radius-4' onClick={() => updateConnection(item.id, 4)}>Cancel Request</button>
                                                    </div>
                                                    : <div className='flex flex-row gap-2'>
                                                        <button className='bg-green-500 text-white text-xs px-4 py-1 radius-4' onClick={() => updateConnection(item.id, 2)}>Accept</button>
                                                        <button className='bg-red-500 text-white text-xs px-4 py-1 radius-4' onClick={() => updateConnection(item.id, 3)}>Decline</button>
                                                    </div>


                                            )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </Cards>
            </div>
            <div className='columns-xl'>

            </div>
        </Layout>
    )
}

export default Friends
