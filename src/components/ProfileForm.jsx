import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCurrentUser, storedUser } from '../features/auth/authSlice';
import { getLocation } from '../services/locationApi';
import { updateUser, uploadImage } from '../services/userApi';

function ProfileForm() {
  const userData = useSelector(storedUser);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    instruments: [],
    location: '',
    profilePicture: '',
    genres: [],
    bio: '',
  });
  const { name, instruments, location, profilePicture, genres, bio } =
    userData.currentUser;
  useEffect(() => {
    setUser({ name, instruments, location, profilePicture, genres, bio });
  }, []);
  const [image, setImage] = useState('');

  const handleStringChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageUpload = async (event) => {
    const uploadData = new FormData();
    uploadData.append('profilePicture', event.target.files[0]);
    const uploadedImage = await uploadImage(uploadData);
    console.log('uploadData: ', uploadData);
    setUser({ ...user, profilePicture: uploadedImage.data.secure_url });
    setImage(uploadedImage.data.secure_url);
  };

  const handleCheckboxChange = async (event, type) => {
    let newArray = [...user[type], event.target.id];
    if (user[type].includes(event.target.id)) {
      newArray = newArray.filter((element) => element !== event.target.id);
    }
    try {
      await setUser({ ...user, [type]: newArray });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.name === '') {
      setUser({ ...user, name: userData.currentUser.name });
      console.log(
        user.name,
        'Name shouldn`t be empty, instead should be this',
        userData.currentUser.name
      );
    }
    console.log(user, 'Nothing should be empty');
    updateUser(id, user)
      .then((updatedUser) => {
        setUser(updatedUser);
        dispatch(setCurrentUser(updatedUser));
      })
      .catch((error) => {
        console.log(error, 'Error when trying to update profile');
      });
  };

  const getCurrentLocation = (event) => {
    event.preventDefault();
    getLocation()
      .then((response) => {
        const { city, country } = response.data;
        setUser({
          ...user,
          location: `${city},${country}`,
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='cardHeader'>
      <form onSubmit={handleSubmit}>
        <h2 className='name'>Edit Profile:</h2>
        <div className='form-section'>
          <div className='row-centered'>
            <label>
              <h3>Change your photo:</h3>
            </label>
            <input type='file' onChange={handleImageUpload} />
            <img
              className='avatar-form raise'
              src={image || userData.currentUser.profilePicture}
              alt='cover photo'
            />
          </div>
          <div className='row-centered'>
            <label className='row-centered'>
              <h3>Name:</h3>
              <input
                type='text'
                name='name'
                placeholder={userData.currentUser.name}
                value={user.name}
                onChange={handleStringChange}
              />
            </label>
          </div>

          <h3>Instruments: </h3>
          <div className='row-centered'>
            <label className='grow-label' htmlFor='guitar'>
            <input
              type='checkbox'
              id='guitar'
              value='guitar'
              onChange={(event) => handleCheckboxChange(event, 'instruments')}
            />
              Guitar
            </label>
            <label className='grow-label' htmlFor='drums'>
            <input
              type='checkbox'
              id='drums'
              value='drums'
              onChange={(event) => handleCheckboxChange(event, 'instruments')}
            />
              Drums
            </label>
            <label className='grow-label' htmlFor='bass'>
            <input
              type='checkbox'
              id='bass'
              value='bass'
              onChange={(event) => handleCheckboxChange(event, 'instruments')}
            />
              Bass
            </label>
            <label className='grow-label' htmlFor='vocals'>
            <input
              type='checkbox'
              id='vocals'
              value='vocals'
              onChange={(event) => handleCheckboxChange(event, 'instruments')}
            />
              Vocals
            </label>
            <label className='grow-label' htmlFor='keyboard'>
            <input
              type='checkbox'
              id='keyboard'
              value='keyboard'
              onChange={(event) => handleCheckboxChange(event, 'instruments')}
            />
              Keyboard
            </label>
            <label className='grow-label' htmlFor='other'>
            <input
              type='checkbox'
              id='other'
              value='other'
              onChange={(event) => handleCheckboxChange(event, 'instruments')}
            />
              Other
            </label>
          </div>

          <h3>Genres: </h3>
          <div className='row-centered'>
            <label className='grow-label' htmlFor='rock'>
              <input
                type='checkbox'
                id='rock'
                value='rock'
                onChange={(event) => handleCheckboxChange(event, 'genres')}
              />
              Rock
            </label>
            <label className='grow-label' htmlFor='electronic'>
              <input
                type='checkbox'
                id='electronic'
                value='electronic'
                onChange={(event) => handleCheckboxChange(event, 'genres')}
              />
              Electronic
            </label>
            <label className='grow-label' htmlFor='metal'>
              <input
                type='checkbox'
                id='metal'
                value='metal'
                onChange={(event) => handleCheckboxChange(event, 'genres')}
              />
              Metal
            </label>
            <label className='grow-label' htmlFor='jazz'>
              <input
                type='checkbox'
                id='jazz'
                value='jazz'
                onChange={(event) => handleCheckboxChange(event, 'genres')}
              />
              Jazz
            </label>
            <label className='grow-label' htmlFor='hip hop/rap'>
              <input
                type='checkbox'
                id='hip hop/rap'
                value='hip hop/rap'
                onChange={(event) => handleCheckboxChange(event, 'genres')}
              />
              Hip hop/Rap
            </label>
            <label className='grow-label' htmlFor='pop'>
              <input
                type='checkbox'
                id='pop'
                value='pop'
                onChange={(event) => handleCheckboxChange(event, 'genres')}
              />
              Pop
            </label>
          </div>

          <h3>Bio: </h3>
          <textarea
            name='bio'
            value={user.bio}
            onChange={handleStringChange}
            placeholder='Tell us about your story...'
            rows='3'
            cols='50'
          />

          <div className='details'>
            <input
              type='text'
              placeholder='e.g. Berlin, DE'
              name='location'
              onChange={handleStringChange}
              value={user.location}
            />
            <button className='buttons raise' onClick={getCurrentLocation}>
              Use your current location
            </button>
          </div>
          <button className='buttons raise'>Update</button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
 