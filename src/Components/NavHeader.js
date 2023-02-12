import React, { Fragment, useState, useEffect } from 'react';
import { HeaderStyle } from '../Common/CardStyles';
import { Menu, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";
import { UserContext } from '../Contexts/UserContext';
import { useNavigate } from "react-router-dom";
import { AuthNavigation, UserNavigation } from '../Utils';
import SearchUser from './SearchUser';

function NavHeader() {
    const navigate = useNavigate();
    const logOut = () => {
        navigate('/sign-out');
    }

    return (
        <UserContext.Consumer>
            {({ user, setUser }) => (
                <div className="flex flex-row w-full border-b-2 border-b-grey-500" style={HeaderStyle}>
                    <div className='columns-xl'>
                        <div className='flex flex-row items-center mt-4 pl-4'>
                            <Link to='/'>
                                <img className="h-8 w-8" src="/images/bird.svg" alt="Your Company" />
                            </Link>

                            {
                                !user.id && <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {AuthNavigation.map((item) => (
                                            <div className='pr-4' key={item.name}>
                                                <Link to={item.url}>
                                                    {item.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        user && user.id &&
                        <React.Fragment>
                            <div className='columns-auto w-full'>
                                <div className='flex'>
                                    <SearchUser />
                                </div>
                            </div>
                            <div className='columns-xl'>
                                <div className='flex flex-row justify-end items-center mt-4 pl-4'>
                                    <div className='flex flex-row justify-end items-center pr-4'>
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="flex max-w-xs items-center rounded-full text-sm">

                                                    <p className='block px-4 py-2 text-sm'>
                                                        {user.name}
                                                    </p>
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={"/avatars/" + user.avatar}
                                                        alt="Your Avatar"
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {UserNavigation.map((item) => (
                                                        <div className='flex flex-row' key={item.name}>
                                                            <Link to={item.url} className='block px-4 py-2 text-sm text-gray-700'>
                                                                {item.name}
                                                            </Link>
                                                        </div>
                                                    ))}
                                                    <p className='block px-4 py-2 text-sm text-gray-700' onClick={() => { setUser({}); logOut(); }}>Logout</p>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                </div>
            )}
        </UserContext.Consumer>
    )
}

export default NavHeader
