import React, { useState, useEffect } from 'react';
import ChatBox from '../Components/ChatBox';
// import socketIO from 'socket.io-client';
// const socket = socketIO.connect('http://localhost:3000');

function ChatPanel({ user, requests, friends }) {
    const [selectedFriend, setSelectedFriend] = useState({});
    const logout = () => {
        // socket.emit('logout', user.id);
    }
    // client-side
    useEffect(() => {
        // async function getUserData() {
        //     await socket.emit('message', user.id);
        //     const ids = [];
        //     for await (const item of friends) {
        //         ids.push(item.id);
        //     }
        //     console.log('ids', ids);
        //     await socket.emit('friendList', ids);
        // }
        // getUserData();
    }, []);
    const onClose = () => {
        setSelectedFriend({});
    }
    return (
        <div className='flex flex-col px-4'>
            <h3 className='text-slate-700 text-sm mb-4'>New Friend Requests</h3>
            {
                requests && requests.length > 0
                    ?
                    (
                        requests.map(item => (
                            <div className='flex flex-row bg-white p-4 radius-4 mb-4 border-2 border-slate-100' key={item.id}>
                                <img
                                    className={"w-16 w-16 rounded-full"}
                                    src={"/avatars/" + item.avatar}
                                    alt={'avatar'}
                                />
                                <div className='pl-4 flex flex-col items-between'>
                                    <h3 className='mb-2'>{item.name}</h3>
                                    <div className='flex flex-row gap-2'>
                                        <button className='bg-green-500 text-white text-xs px-4 py-1 radius-4' >Accept</button>
                                        <button className='bg-red-500 text-white text-xs px-4 py-1 radius-4' >Decline</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                    :
                    (
                        <div className='text-sm text-slate-300 py-1 mb-4'>
                            No Requests...
                        </div>
                    )
            }

            <h3 className='text-slate-700 text-sm mb-4'>Chats</h3>
            <div className='flex flex-col bg-white border-2 border-slate-100'>
                {
                    friends && friends.length > 0
                        ?
                        (
                            friends.map(item => (
                                <div className='flex flex-row items-center p-2' key={item.id} onClick={() => setSelectedFriend(item)}>
                                    <img
                                        className={"w-8 w-8 rounded-full mr-4"}
                                        src={"/avatars/" + item.avatar}
                                        alt={'avatar'}
                                    />
                                    <h3 className='text-sm'>{item.name}</h3>
                                </div>
                            ))
                        )
                        :
                        (
                            <p className='p-2'>No one is online</p>
                        )
                }
            </div>

            {
                selectedFriend.id &&
                <ChatBox
                    user={user}
                    selectedFriend={selectedFriend}
                    onClose={onClose} />
            }
        </div>
    )
}

export default ChatPanel
