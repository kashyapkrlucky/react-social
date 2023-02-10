import React from 'react'
import { Link } from "react-router-dom";
import { UsersIcon, UserGroupIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

function SideMenu() {
    return (
        <div className='flex flex-col pl-4 border-r-indigo-500'>
            <div className='flex flex-row'>
                <Link to='/profile' className='flex flex-row py-4'>
                    <UsersIcon className="h-6 w-6 mr-4" /> <span>Friends</span>
                </Link>
            </div>
            <div className='flex flex-row'>
                <Link to='/profile' className='flex flex-row py-4'>
                    <UserGroupIcon className="h-6 w-6 mr-4" /> <span>Group</span>
                </Link>
            </div>
            <div className='flex flex-row'>
                <Link to='/profile' className='flex flex-row py-4'>
                    <BuildingStorefrontIcon className="h-6 w-6 mr-4" /> <span>Marketplace</span>
                </Link>
            </div>
        </div>
    )
}

export default SideMenu
