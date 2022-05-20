import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCurrentUser, storedUser } from '../features/auth/authSlice';
import { sendFriendRequest, getUser, unfollow } from '../services/userApi';

function ProfilePage() {
  const [user, setUser] = useState({
    name: '',
    instruments: [],
    location: '',
    profilePicture: '',
    coverPhoto: '',
    listensto: [],
    genres: [],
    bio: '',
    currentBands: [],
    friendList: [],
  });
  const userData = useSelector(storedUser);
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const { id } = useParams();
  const isOwner = id === userData.currentUser?._id;
  //const hasReceivedRequest = userData.currentUser?.pendingReceivedRequests.includes(id)
  const isFriend = userData.currentUser?.friendList.includes(id);

  const hasSentRequest = userData.currentUser?.pendingSentRequests.includes(id);
  const navigate = useNavigate();

  useEffect(() => {
    setIsPending(hasSentRequest);
    console.log('hasSentRequest:', hasSentRequest);
    getUser(id)
      .then((response) => {
        console.log('response.data:', response.data);
        setUser(response.data);
      })
      .catch((error) => {
        return error.response.data;
      });
  }, [hasSentRequest]);

  /////MIGHT NEED TO DISPLAY IF IT'S OUR PROFILE
  // pendingSentRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
  // pendingReceivedRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
  const clickHandler = () => {
    navigate(`/editprofile/${id}`);
  };

  const connectHandler = () => {
    sendFriendRequest(userData.currentUser._id, id)
      .then((response) => {
        // add user id in sentRequest list of loggedin user
        console.log('response after sending friend request', response);
        dispatch(setCurrentUser(response.data));
        setIsPending(true);
      })
      .catch((error) => console.log(error));
  };

  const unfollowHandler = () => {
    unfollow(userData.currentUser._id, id)
      .then((updatedUser) => {
        console.log('user after promise: ', updatedUser.data);
        dispatch(setCurrentUser(updatedUser.data));
      })
      .catch((error) => console.log(error));
  };

  const genresArray = user.genres?.map(genre => <span className="details">{genre}</span>)

  return (
    <div className='profile-page'>
    <div className='container'>
    <img className='card-img-top raise' src={user?.profilePicture} alt='cover photo' />
    </div>
      <div className='name'>{user?.name}</div>
      <p className='details'><i>Instrument I play:</i> {user?.instruments}</p>
      <p className='details'><i>Genres:</i> {genresArray}</p>
      <p className='details'><i>About me:</i> {user?.bio}</p>
      <div className='details'>
        <i>{user?.location}</i>
      </div>
      {/* {hasReceivedRequest && <Notification/>} */}
      {isOwner ? (
        <div>
          {' '}
          <button className='raise' onClick={clickHandler}>
            Edit profile
          </button>
        </div>
      ) : (
        <div>
          <button
            className='raise'
            onClick={connectHandler}
            disabled={isPending}
          >
            {isPending ? `Pending...` : 'Connect'}
          </button>
          <button className='raise'>Chat</button>
        </div>
      )}
      {isFriend && (
        <div>
          <button className='raise' onClick={unfollowHandler}>
            Unfollow
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
