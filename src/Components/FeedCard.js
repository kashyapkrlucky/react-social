import React from 'react';
import Avatar from '../Common/Avatar';
import { HandThumbUpIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon as SolidHandThumbUpIcon } from '@heroicons/react/24/solid';
import Cards from '../Common/Cards';
import DeleteItem from '../Common/DeleteItem';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

function FeedCard({ user, post, deleteFeed, updateLike }) {
  const isLiked = (likes) => {
    return likes.findIndex(item => item.likedBy === user.id);
  }
  const toggleLike = () => {
    const index = isLiked(post.likes);
    return {
      post: post._id,
      likedBy: index > -1 ? post.likes[index].likedBy : user.id
    }
  }
  return (
    <Cards className="flex flex-row mb-4 w-full">
      <Avatar name={post.createdBy.name} url={post.createdBy.avatar} />
      <div className="flex flex-col pl-4 w-full">
        <div className="flex flex-col">
          <h3 className='font-medium'>
            <Link to={'/profile/' + post.createdBy._id}>{post.createdBy.name}</Link>
          </h3>
          <p className='text-xs text-slate-400'><Moment fromNow>{post.created_at}</Moment></p>
        </div>
        <div className="flex flex-col py-4 text-slate-500">
          <p>{post.description}</p>
        </div>
        <div className="flex flex-row gap-4">
          <button className="flex flex-row items-center gap-4" onClick={() => updateLike(toggleLike())}>
            {
              isLiked(post.likes) > -1 ?
                <SolidHandThumbUpIcon className='w-4 text-blue-500' />
                :
                <HandThumbUpIcon className='w-4 text-slate-500' />
            }
            <p className='text-slate-400'>{post.likes.length}</p>
          </button>
          <button className="flex flex-row items-center gap-4">
            <ChatBubbleLeftEllipsisIcon className='w-4 text-slate-500' />
            <p className='text-slate-400'>{post.comments.length}</p>
          </button>
        </div>
      </div>
      {
        (post.createdBy._id === user.id) && <DeleteItem id={post._id} deleteFeed={deleteFeed} />
      }
    </Cards>
  )
}

export default FeedCard
