import React, { useState } from 'react'
import NavHeader from '../Common/NavHeader';
import Buttons from '../Common/Buttons';
import { HeightPage } from '../Common/CardSizes';
import Inputs from '../Common/Inputs';
import HttpClient from '../HttpClient';
import { UserContext } from '../Contexts/UserContext';
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { ModalPage } from '../Common/ModalPage';

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState({
        text: '',
        type: ''
    });
    const [currentUser, setCurrentUser] = useState({});
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const isSubmitDisabled = () => {
        const isEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email));
        const isPassword = formData.password.length > 5;
        const isFormValid = isEmail && isPassword;
        setIsBtnDisabled(!isFormValid);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return { ...prev, [name.toLowerCase()]: value }
        });
        isSubmitDisabled();
    }
    const navigate = useNavigate();
    const handleSubmit = async () => {

        try {
            const response = await HttpClient.post('api/user/sign-in', formData);
            const { data } = await response.data;
            const userInfo = await decodeToken(data);
            setCurrentUser(userInfo);
        } catch (error) {
            const { message } = error.response.data
            setMessage({ text: message, type: 'error' });
        }
    }
    return (
        <UserContext.Consumer>
            {({ user, setUser }) => (
                <React.Fragment>
                    <NavHeader />
                    <div className="flex flex-row justify-center items-center" style={{ height: HeightPage }}>
                        <div className="basis-1/3 mx-auto shadow-xl p-4">
                            <p className="text-xl mb-8">Already have an account, Log in</p>
                            <div className='flex flex-col'>
                                <Inputs label="email" value={formData.email} type='email' placeholder='Enter your email' onChange={handleChange} />
                                <Inputs label="password" value={formData.password} type='password' placeholder='Enter your password' onChange={handleChange} />
                                <Buttons text='Login' className='primary' onClick={() => { handleSubmit(); setUser(currentUser); navigate('/dashboard');}} isDisabled={isBtnDisabled}></Buttons>
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

            )}
        </UserContext.Consumer>

    )
}

export default SignIn
