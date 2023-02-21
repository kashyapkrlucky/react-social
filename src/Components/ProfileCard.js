import React, { useState } from 'react';
import Cards from '../Common/Cards'
import Inputs from '../Common/Inputs';
import HttpClient from '../HttpClient';

function ProfileCard({ user, updateProfile, setIsEditOpen }) {
  const [profile, setProfile] = useState({
    user: user._id,
    name: user.name,
    email: user.email,
    username: user.profile ? user.profile.username : '',
    city: user.profile ? user.profile.city : '',
    country: user.profile ? user.profile.country : '',
    tagline: user.profile ? user.profile.tagline : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => {
      return { ...prev, [name.toLowerCase()]: value }
    });
  }

  const handleSubmit = async () => {
    const response = await HttpClient.post(`api/user/profile/full`, profile);
    if (response.status) {
      updateProfile();
    }
  }
  return (
    <Cards className='mb-4'>
      <Inputs
        label="name"
        value={profile.name}
        type='text'
        placeholder='Enter name' onChange={handleChange} />
      <Inputs
        label="email"
        value={profile.email}
        type='text'
        placeholder='Enter email' onChange={handleChange} />
      <Inputs
        label="username"
        value={profile.username}
        type='text'
        placeholder='Enter user name' onChange={handleChange} />
      <Inputs
        label="city"
        value={profile.city}
        type='text'
        placeholder='Enter city' onChange={handleChange} />
      <Inputs
        label="country"
        value={profile.country}
        type='text'
        placeholder='Enter country' onChange={handleChange} />
      <Inputs
        label="tagline"
        value={profile.tagline}
        type='text'
        placeholder='Enter tagline' onChange={handleChange} />
      <div className='flex flex-row justify-end gap-4'>
        <button className='bg-slate-300 radius-4 px-4 py-2' onClick={() => setIsEditOpen(false)}>Close</button>
        <button className='bg-purple-700 text-white radius-4 px-4 py-2' onClick={handleSubmit}>Update</button>
      </div>
    </Cards>
  )
}

export default ProfileCard
