import React from 'react'

function Avatar({ name, url, className }) {
    return (
        <img
            className={"h-8 w-8 rounded-full " + className}
            src={"/avatars/" + url}
            alt={name}
        />
    )
}

export default Avatar
