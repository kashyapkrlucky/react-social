import React, { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3000');

function ChatBox({ user, requests, friends }) {
    const logout = () => {
        socket.emit('logout', user.id);
    }
    // client-side
    useEffect(() => {
        socket.emit('message', user.id);
        const f = friends.map(f => { return { id: f.id } });
        socket.emit('friendList', f);
        socket.on('messageResponse', (data) => console.log(data));
    }, []);
    return (
        <div className='flex flex-col px-4'>
            <h3 className='font-bold text-slate-400 text-sm mb-4'>Friend Requests <button onClick={logout}>test</button></h3>
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

            <h3 className='font-bold text-slate-400 text-sm mb-4'>Chats</h3>
            <div className='flex flex-col bg-white border-2 border-slate-100'>
                {
                    friends && friends.length > 0
                        ?
                        (
                            friends.map(item => (
                                <div className='flex flex-row items-center p-2' key={item.id}>
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
        </div>
    )
}

export default ChatBox
