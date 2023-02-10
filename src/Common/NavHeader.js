import React, { Fragment } from 'react';
import { LightGrey } from './Themes';
import { HeightNav } from './CardSizes';
import { Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import { UserContext } from '../Contexts/UserContext';
import { useNavigate } from "react-router-dom";
import { AuthNavigation, UserNavigation } from '../Utils';



const navStyle = {
    height: HeightNav,
    background: '#fafafa'
}


function NavHeader() {
    const navigate = useNavigate();
    const logOut = () => {
        navigate('/sign-in');
    }
    return (
        <UserContext.Consumer>
            {({ user, setUser }) => (
                <div className="mx-auto px-4" style={navStyle}>
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-8 w-8"
                                    src="images/bird.svg"
                                    alt="Your Company"
                                />
                            </div>
                            {!user.id && <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {AuthNavigation.map((item) => (
                                        <div key={item.name}>
                                            <Link to={item.url}>
                                                {item.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>}
                        </div>
                        {user && user.id && <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">


                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex max-w-xs items-center rounded-full  text-sm">
                                            <span className="sr-only">Open user menu</span>

                                            <p className='block px-4 py-2 text-sm'>
                                                {user.name}
                                            </p>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={"avatars/" + user.avatar}
                                                alt="Your Avatar"
                                            />
                                            {/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
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
                                                <div key={item.name}>
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
                        </div>}
                    </div>
                </div>)}
        </UserContext.Consumer>
    )
}

export default NavHeader
