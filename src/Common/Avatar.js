import React from 'react'

function Avatar({ name, url, className='h-8 w-8 ' }) {
    return (
        <img
            className={"rounded-full " + className}
            src={"/avatars/" + url}
            alt={name}
        />
    )
}

export default Avatar
