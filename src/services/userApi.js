import axios from 'axios';

const getUser = (id) => {
  return axios.get(`/api/user/${id}`);
};

const getUserList = () => {
  return axios.get('/api/user/list');
};

const updateUser = (id, user) => {
  console.log('id and user: ', id, user)
  return axios.post(`/api/profile/user/${id}`, user)
};


// Connection-related calls

const sendFriendRequest = (currentUserId, otherUserId) => {
  console.log(currentUserId, 'current user Id on axios call', otherUserId, 'added user id');
  return axios.post(`/connect/${otherUserId}`, {currentUserId:currentUserId});
};

const acceptFriendRequest = (currentUserId, otherUserId) => {
  return axios.post(`/connect/accept/${otherUserId}`, {currentUserId:currentUserId})
};

const declineFriendRequest = (currentUserId, otherUserId) => {
  return axios.post(`/connect/decline/${otherUserId}`, {currentUserId:currentUserId})
};

const unfollow = (currentUserId, otherUserId) => {
  return axios.post(`/connect/unfollow/${otherUserId}`, {currentUserId:currentUserId})
}

const uploadImage = (file) => {
  return axios.post('/api/fileUpload', file)
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