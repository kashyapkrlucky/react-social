import React from 'react';

function ConnectionStatus({ status, addConnection }) {

    return (
        <div>
            {
                status &&
                    (status === 1)
                    ? (
                        <div className='flex flex-row gap-2 items-center'>
                            <p>Pending</p><button className='bg-slate-500 text-white text-xs px-4 py-1 radius-4'>Cancel Request</button>
                        </div>
                    )
                    : (
                        status === 2
                            ? 'Friends'
                            : <button className='bg-green-500 text-white text-xs px-4 py-1 radius-4' onClick={addConnection}>Add Friend</button>)
            }
        </div>
    )
}

export default ConnectionStatus
