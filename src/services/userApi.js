import axios from 'axios';

const getUser = (id) => {
  return axios.get(`https://musicthingy.herokuapp.com/api/user/${id}`);
};

const getUserList = () => {
  return axios.get('https://musicthingy.herokuapp.com/api/list');
};

const updateUser = (id, user) => {
  console.log('id and user: ', id, user)
  return axios.post(`https://musicthingy.herokuapp.com/api/profile/user/${id}`, user)
};


// Connection-related calls

const sendFriendRequest = (currentUserId, otherUserId) => {
  console.log(currentUserId, 'current user Id on axios call', otherUserId, 'added user id');
  return axios.post(`https://musicthingy.herokuapp.com/connect/${otherUserId}`, {currentUserId:currentUserId});
};

const acceptFriendRequest = (currentUserId, otherUserId) => {
  return axios.post(`https://musicthingy.herokuapp.com/connect/accept/${otherUserId}`, {currentUserId:currentUserId})
};

const declineFriendRequest = (currentUserId, otherUserId) => {
  return axios.post(`https://musicthingy.herokuapp.com/connect/decline/${otherUserId}`, {currentUserId:currentUserId})
};

const unfollow = (currentUserId, otherUserId) => {
  return axios.post(`https://musicthingy.herokuapp.com/connect/unfollow/${otherUserId}`, {currentUserId:currentUserId})
}

const uploadImage = (file) => {
  return axios.post('https://musicthingy.herokuapp.com/api/fileUpload', file)
}

export { 
    getUser,
    getUserList,
    updateUser,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    unfollow,
    uploadImage
};