import React, { useContext, useState, useEffect } from 'react';
import NavHeader from '../Components/NavHeader';
import SideMenu from '../Components/SideMenu';
import { PageStyle } from '../Common/CardStyles';
import { UserContext } from '../Contexts/UserContext';
import HttpClient from '../HttpClient';

function Friends() {
    const context = useContext(UserContext);

    const [friends, setFriends] = useState([]);

    const getFriends = async () => {
        const response = await HttpClient.get(`api/user/my-connections/all/${context.user.id}`);
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
        return () => {
            console.log('d');
        };
    }, []);
    return (
        <React.Fragment>
            <NavHeader />
            <div className="flex flex-row min-w-full py-8" style={PageStyle}>
                <div className='columns-xl'>
                    <SideMenu />
                </div>
                <div className='columns-auto w-full'>
                    <div className='flex flex-col gap-4'>
                        {
                            friends.map(item => (
                                <div className='flex flex-row justify-between bg-white p-4 shadow-sm' key={item.id}>
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
                    </div>
                </div>
                <div className='columns-xl'>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Friends
