import React from 'react';

function Cards({ children, className }) {
  return (
    <div className={'bg-white p-4 border-2 border-slate-100 ' + className} style={{borderRadius: '4px'}}>
      { children }
    </div>
  )
}

export default Cards
