import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ModalPage } from '../Components/ModalPage';
import Cards from '../Common/Cards';

function DeleteItem({ deleteFeed, id }) {
    const [isOpen, setIsOpen] = useState('');
    const toggleModal = () => {
        setIsOpen((prev) => {
            return !prev;
        });
    }
    return (
        <React.Fragment>
            <div>
                <TrashIcon className='w-4 text-slate-400' onClick={toggleModal} />
            </div>
            {
                isOpen &&
                <ModalPage>
                    <Cards className='flex flex-col w-1/3'>
                        <h3 className='text-xl mb-4'>Delete Item</h3>
                        <p className='text-slate-500'>Are you sure you want to delete it?</p>
                        <div className='flex justify-end gap-4'>
                            <button className='bg-gray-300 text-sm px-4 py-2 radius-4' onClick={toggleModal}>Cancel</button>
                            <button className='bg-red-600 text-white text-sm px-4 py-2 radius-4' onClick={() => deleteFeed(id)}>OK</button>
                        </div>
                    </Cards>
                </ModalPage>
            }
        </React.Fragment>
    )
}

export default DeleteItem;
