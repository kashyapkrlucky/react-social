import React from 'react';

function Inputs({ label, value, type, name, placeholder, onChange }) {
    return (
        <div className='flex flex-col mb-8 grow'>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                {label}
            </label>
            <input
                name={label}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}

export default Inputs
