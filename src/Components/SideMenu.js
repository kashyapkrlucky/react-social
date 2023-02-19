import React from 'react'
import { Link, NavLink } from "react-router-dom";
import {
    UsersIcon, UserCircleIcon, RectangleGroupIcon, NewspaperIcon
} from '@heroicons/react/24/outline';

function SideMenu() {
    return (
        <div className='flex flex-col pl-4 border-r-indigo-500'>
            <NavLink to="/dashboard"
                className={({ isActive }) =>
                    ('flex flex-row py-4 ' + (isActive ? 'text-purple-600' : 'text-slate-600'))
                }>
                <NewspaperIcon className="h-6 w-6 mr-4" /> <span>New Updates</span>
            </NavLink>
            <NavLink to="/profile"
                className={({ isActive }) =>
                    ('flex flex-row py-4 ' + (isActive ? 'text-purple-600' : 'text-slate-600'))
                }>
                <UserCircleIcon className="h-6 w-6 mr-4" /> <span>Profile</span>
            </NavLink>
            <NavLink to="/friends"
                className={({ isActive }) =>
                    ('flex flex-row py-4 ' + (isActive ? 'text-purple-600' : 'text-slate-600'))
                }>
                <UsersIcon className="h-6 w-6 mr-4" /> <span>Friends</span>
            </NavLink>
            <NavLink to="/groups"
                className={({ isActive }) =>
                    ('flex flex-row py-4 ' + (isActive ? 'text-purple-600' : 'text-slate-600'))
                }>
                <RectangleGroupIcon className="h-6 w-6 mr-4" /> <span>Groups</span>
            </NavLink>
        </div>
    )
}

export default SideMenu
