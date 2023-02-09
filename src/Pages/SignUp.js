import React, { useState } from 'react'
import NavHeader from '../Common/NavHeader';
import Buttons from '../Common/Buttons';
import { HeightPage } from '../Common/CardSizes';
import Inputs from '../Common/Inputs';
import { ModalPage } from '../Common/ModalPage';
import HttpClient from '../HttpClient';

function SignUp() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState({
        text: '',
        type: ''
    });
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const isSubmitDisabled = () => {
        const isName = user.name.length > 2;
        const isEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email));
        const isPassword = user.password.length > 5;
        const isFormValid = isName && isEmail && isPassword;
        setIsBtnDisabled(!isFormValid);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => {
            return { ...prev, [name.toLowerCase()]: value }
        });
        isSubmitDisabled();
    }
    const handleSubmit = (e) => {
        HttpClient
            .post('api/user/sign-up', user)
            .then(res => {
                setMessage({ text: res.data.message, type: 'success' });
                setUser({
                    name: '',
                    email: '',
                    password: ''
                });
            }).catch(function (error) {
                setMessage({ text: error.response.data.message, type: 'error' });
            });
    }
    return (
        <React.Fragment>
            <NavHeader />
            <div className="flex flex-row justify-center items-center" style={{ height: HeightPage }}>
                <div className="basis-1/3 mx-auto shadow-xl p-4">
                    <p className="text-xl mb-8">Sign Up</p>
                    <div className='flex flex-col'>
                        <Inputs label="name" value={user.name} type='text' placeholder='Enter your name' onChange={handleChange} />
                        <Inputs label="email" value={user.email} type='email' placeholder='Enter your email' onChange={handleChange} />
                        <Inputs label="password" value={user.password} type='password' placeholder='Enter your password' onChange={handleChange} />
                        <Buttons text='Register' className='primary' onClick={handleSubmit} isDisabled={isBtnDisabled}></Buttons>
                    </div>
                </div>

                {
                    (message && message.text) && <ModalPage>
                        <div className='flex flex-col bg-white text-left shadow-xl p-4 w-1/3'>
                            <div className='flex flex-row justify-between items-center'>
                                <h3 className={message.type === 'error' ? 'text-red-500 text-2xl' : 'text-green-500 text-2xl'}>{message.type === 'error' ? 'Error' : 'Success'}</h3>
                                <button className='primary' onClick={() => setMessage({ text: '', type: '' })}>Close</button>
                            </div>
                            <p className='text-base text-slate-600 my-4'>{message.text}</p>

                        </div>
                    </ModalPage>
                }

            </div>
        </React.Fragment>
    )
}

export default SignUp
