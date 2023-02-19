import React, { useState, useEffect } from 'react';
import HttpClient from '../HttpClient';
import Avatar from '../Common/Avatar';
import { TrashIcon } from '@heroicons/react/24/outline';

import Moment from 'react-moment';

import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

function Comments({ user, selectedPostId, setIsCommentsOpen }) {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const getComments = async () => {
        const response = await HttpClient.get(`api/post/comments/${selectedPostId}`);
        const { data } = await response.data;
        setComments(data);
    }
    const handleChange = (e) => {
        setCommentText(e.target.value);
    }
    const addComment = async () => {
        const payload = {
            text: commentText, commentBy: user.id, post: selectedPostId
        }
        const response = await HttpClient.post(`api/post/comment/add`, payload);
        if (response.status) {
            getComments();
            setCommentText('');
        }
    }

    const deleteComment = async (id) => {
        const response = await HttpClient.delete(`api/post/comment/delete/${id}`);
        if (response.status) {
            getComments();
        }
    }
    useEffect(() => {
        getComments();
        return () => {
            console.log('cleanup');
        };
    }, []);
    return (
        <div className='flex flex-col w-1/3 bg-white radius-4'>
            <div className='flex flex-row justify-between items-center p-4 border-b-2 border-slate-100'>
                <h3>Comments</h3>
                <button className='p-1' onClick={() => setIsCommentsOpen(false)}>
                    <XMarkIcon className='w-6 text-slate-500' />
                </button>
            </div>
            <div className='flex flex-col p-4 gap-4 max-h-80 overflow-y-auto'>
                {
                    comments && comments.length > 0
                        ?
                        (
                            comments.map(item => (
                                <div className='flex flex-col' key={item._id}>
                                    <div className='flex flex-row gap-4 items-center'>
                                        <Avatar name={item.commentBy.name} url={item.commentBy.avatar} />
                                        <h3 className='font-medium'>
                                            {item.commentBy.name}
                                        </h3>
                                        <p className='text-xs text-slate-400'><Moment fromNow>{item.created_at}</Moment></p>
                                        {
                                            item.commentBy._id === user.id && (<TrashIcon className='w-4 text-slate-400' onClick={() => deleteComment(item._id)} />)
                                        }

                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='text-slate-500 pl-12'>{item.text}</p>
                                    </div>
                                </div>
                            ))
                        )
                        :
                        (
                            <p className='text-slate-500 text-sm'>No Comments yet.</p>
                        )
                }
            </div>
            <div className='flex flex-row'>
                <input className='grow border-2' value={commentText} type="text" placeholder='Enter your comment...' onChange={handleChange} />
                <button className='px-4 py-1 border-2' onClick={addComment}>
                    <PaperAirplaneIcon className='w-6 text-slate-500' />
                </button>
            </div>
        </div>
    )
}

export default Comments
