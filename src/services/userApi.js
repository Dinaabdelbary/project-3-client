import axios from 'axios';

const getUser = (id) => {
  return axios.get(`https://musicthingy.herokuapp.com/api/user/${id}`);
};

const getUserList = () => {
  return axios.get('https://musicthingy.herokuapp.com/api/user/list');
};

const updateUser = (id, user) => {
  console.log('id and user: ', id, user)
  return axios.post(`https://musicthingy.herokuapp.com/api/profile/user/${id}`, user)
};

const sendFriendRequest = (id) => {
  return axios.get(`https://musicthingy.herokuapp.com/connect/${id}`);
};

const acceptFriendRequest = (id) => {
  return axios.get(`https://musicthingy.herokuapp.com/connect/accept/${id}`)
};

const declineFriendRequest = (id) => {
  return axios.get(`https://musicthingy.herokuapp.com/connect/decline/${id}`)
};

const unfollow = (id) => {
  return axios.get(`https://musicthingy.herokuapp.com/connect/unfollow/${id}`)
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