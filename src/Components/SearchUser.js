import React, { useState, useEffect } from 'react';
import Inputs from '../Common/Inputs';
import HttpClient from '../HttpClient';
import Avatar from '../Common/Avatar';
import { Link } from 'react-router-dom';

function SearchUser({ onSearch }) {
    const [srcText, setSrcText] = useState('');
    const [users, setUsers] = useState([]);
    const getUsers = async (text) => {
        const response = await HttpClient.get(`api/user/search/${text}`);
        const { data } = await response.data;
        setUsers(data);
    }

    useEffect(() => {
        if (srcText.length > 3) {
            getUsers(srcText);
        } else {
            setUsers([]);
        }
        return () => {
            console.log('cleaning users');
        };
    }, [srcText]);
    return (
        <div>
            <Inputs type='text' placeholder='Search' onChange={(e) => setSrcText(e.target.value)} />
            {
                (users && users.length > 0) &&
                <div className='bg-white px-4 shadow-md' style={{ position: 'absolute', width: '250px', top: '52px' }}>
                    {
                        users.map(user => (
                            <div className='flex flex-row' key={user._id}>
                                <Link className='flex flex-row  items-center py-2 gap-4' to={'/profile/' + user._id}>
                                    <Avatar name={user.name} url={user.avatar} />
                                    <h3 className='font-medium' onClick={() => setSrcText('')}>{user.name}</h3>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                }
        </div>
    )
}

export default SearchUser
