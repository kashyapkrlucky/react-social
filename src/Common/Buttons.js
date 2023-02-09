import React from 'react'

function Buttons({type = 'button', text, className, onClick, isDisabled = false}) {
    return (
        <div className='flex flex-col justify-end mb-8 grow'>
            <button 
                type={type} 
                className={className} 
                onClick={onClick}
                disabled={isDisabled}
            >
                {text}
            </button>
        </div>
    )
}

export default Buttons
