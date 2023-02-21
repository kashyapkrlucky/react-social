import React, { useState } from 'react';
import Cards from '../Common/Cards';
import Avatar from '../Common/Avatar';

function CreateFeed({ user, onCreateFeed }) {
    const [description, setDescription] = useState('');
    const onChange = (e) => {
        setDescription(e.target.value);
    }
    return (
        <Cards className="flex flex-row mb-4">
            <Avatar name={user.name} url={user.avatar} />
            <div className="flex flex-col pl-4 w-full">
                <div className="flex flex-col text-slate-500 mb-4">
                    <textarea value={description} placeholder="What's on your mind..." onChange={onChange}></textarea>
                </div>
                <div className='flex flex-row justify-end'>
                    <button className='bg-indigo-800 text-white px-4 py-1 radius-4' disabled={!description} onClick={() => {
                        onCreateFeed({
                            description, createdBy: user.id
                        });
                        setDescription('');
                    }}>Share</button>
                </div>
            </div>
        </Cards>
    )
}

export default CreateFeed
