import React, { useState, useEffect } from 'react';
import HttpClient from '../HttpClient';
import Moment from 'react-moment';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

function ChatBox({ user, selectedFriend, onClose }) {
    const [msgText, setMsgText] = useState('');
    const [messages, setMessages] = useState([]);
    const ChatBoxStyle = {
        'position': 'absolute',
        'bottom': 0,
        'right': '20px'
    }
    useEffect(() => {
        getMessages(selectedFriend.id);
        return () => { console.log('Clearing Feeds') };
    }, []);
    const handleChange = (e) => {
        setMsgText(e.target.value);
    }

    const getMessages = async () => {
        const payload = {
            from: user.id, to: selectedFriend.id
        }
        const response = await HttpClient.post(`api/user/message/list`, payload);
        const { data } = await response.data;
        setMessages(data);
    }
    const addMessage = async () => {
        const payload = {
            text: msgText, from: user.id, to: selectedFriend.id
        }
        const response = await HttpClient.post(`api/user/message/add`, payload);
        if (response.status) {
            setMsgText('');
            getMessages(selectedFriend.id);
        }
    }
    return (
        <div className='bg-stone-100 flex flex-col' style={ChatBoxStyle}>
            <div className='bg-neutral-700 flex flex-row justify-between text-white p-4'>
                <p>{selectedFriend.name}</p>
                <button onClick={onClose}>
                    <XMarkIcon className='w-6 text-slate-500' />
                </button>
            </div>
            <div className='flex flex-col p-4 gap-2'>
                {
                    messages && messages.length > 0
                        ?
                        (
                            messages.map(item => (
                                item.from === user.id ?
                                    (
                                        <div className='text-left' key={item._id}>
                                            <span className='bg-green-300 py-1 px-2 mb-4 radius-4'>{item.text}</span>
                                            <span className='block text-xs mt-2 text-slate-500'><Moment fromNow>{item.created_at}</Moment></span>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className='text-right' key={item._id}>
                                            <span className='bg-white py-1 px-2 radius-4'>{item.text}</span>
                                            <span className='block text-xs mt-2 text-slate-500'>
                                                <Moment fromNow>{item.created_at}</Moment></span>
                                        </div>
                                    )
                            ))
                        )
                        :
                        (<p className='text-xs text-center text-slate-500'>No messages yet.</p>)
                }
            </div>
            <div className='flex flex-row'>
                <input className='grow border-2' value={msgText} type="text" placeholder='Enter your comment...' onChange={handleChange} />
                <button className='px-4 py-1 border-2' onClick={addMessage}>
                    <PaperAirplaneIcon className='w-6 text-slate-500' />
                </button>
            </div>
        </div>
    )
}

export default ChatBox
