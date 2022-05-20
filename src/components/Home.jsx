import React from 'react';
import ListOfUsers from './ListOfUsers';
import FriendList from './FriendList';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
import { getUserList } from '../services/userApi';

const Home = (props) => {
  const userData = useSelector(storedUser);
  console.log('userdata in home: ', userData);

  getUserList();

  return (
    <div className='container'>
      {userData.currentUser?.friendList?.length ? (
        <FriendList setChatId={props.setChatId} />
        
      ) : (
        <div className='project-name'>
        <br/>
        <h1>Find people to play music with!</h1>
        </div>
      )}
      <div className='container'>
      <h2>Cool musicians near you!</h2>
      </div>
      <ListOfUsers setChatId={props.setChatId} />
    </div>
  );
};

export default Home;