import React, { useState, useEffect } from 'react';
import Avatar from '../Common/Avatar';
import HttpClient from '../HttpClient';

import { HandThumbUpIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';

function FeedCard({ user }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => async () => {
    const response = await HttpClient.get(`api/post/connections/${user.id}`);
    const { data } = await response.data;
    setPosts(data);
    return () => { };
  });
  return (
    <div className="flex flex-col">
      {
        posts.map(post => (
          <div className="flex flex-row mb-8" key={post._id}>
            <Avatar name={post.createdBy.name} url={post.createdBy.avatar} />
            <div className="flex flex-col pl-4 w-full">
              <div className="flex flex-col">
                <h3 className='font-medium'>{post.createdBy.name}</h3>
                <p className='text-xs text-slate-400'>{post.created_at}</p>
              </div>
              <div className="flex flex-col py-4 text-slate-500">
                <p>{post.description}</p>
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-row items-center gap-4">
                  <HandThumbUpIcon className='w-4 text-blue-500' />
                  <p className='text-slate-400'>0</p>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <ChatBubbleLeftEllipsisIcon className='w-4 text-blue-500' />
                  <p className='text-slate-400'>0</p>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default FeedCard
