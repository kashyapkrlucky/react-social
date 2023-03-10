import React, { useState, useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import { CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ModalPage } from '../Components/ModalPage';
import { Avatars } from '../Utils';
import Avatar from '../Common/Avatar';
import HttpClient from '../HttpClient';

function UpdatePicture({ user, updateProfile }) {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState('');
    // const { user } = useContext(UserContext);
    const getCurrentImgStyle = (item) => {
        let classes = '';
        if (item.url === user.avatar) {
            classes = 'border-purple-700';
        } else if (item.url === currentImg) {
            classes = 'border-green-700';
        } else {
            classes = 'border-white';
        }
        return classes;
    }

    const onUpdate = async () => {
        const userInfo = {
            name: user.name,
            email: user.email,
            avatar: currentImg
        };
        const response = await HttpClient.put(`api/user/update/${user._id}`, userInfo);
        if (response.status) {
            setIsEditorOpen(false);
            setCurrentImg('');
            updateProfile();
        }
    }
    const iconStyle = {
        'position': 'absolute',
        'bottom': -10
    }
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-center' style={{ 'position': 'relative' }}>
                <Avatar name={user.name} url={user.avatar} className="w-24 h-24" />
                {
                     
                    <div style={iconStyle} className='w-8 h-8 flex flex-row justify-center items-center cursor-pointer bg-white shadow-md rounded-full'>
                        <CameraIcon className='w-6 h-6 text-purple-500' onClick={() => setIsEditorOpen(true)} />
                    </div>
                }

            </div>
            {
                isEditorOpen &&
                <ModalPage>
                    <div className='flex flex-col w-1/2 bg-white radius-4'>
                        <div className='flex flex-row justify-between items-center p-4'>
                            <h3>Change Avatar</h3>
                            <button className='p-1' onClick={() => { setIsEditorOpen(false); setCurrentImg(''); }}>
                                <XMarkIcon className='w-6 text-slate-500' />
                            </button>
                        </div>
                        <div className='flex flex-row flex-wrap p-4 gap-2 max-h-80 overflow-y-auto border-b-2 border-t-2 border-slate-100'>
                            {
                                Avatars.map((item, index) => (
                                    <div key={index} className={"rounded-full border-4 " + getCurrentImgStyle(item)} onClick={() => setCurrentImg(item.url)}>
                                        <Avatar name={item.name} url={item.url} className='w-16 h-16' />

                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex flex-row justify-end p-4'>
                            <button className='bg-indigo-800 text-white px-4 py-1 radius-4' onClick={onUpdate}>Change</button>
                        </div>
                    </div>
                </ModalPage>
            }
        </div>
    )
}

export default UpdatePicture
