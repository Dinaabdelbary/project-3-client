import axios from 'axios';


export const getPreviousMessages = (participants) => {
    return axios.post('https://musicthingy.herokuapp.com/api/chat/conversation', { participants })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
}

export const sendMessage = (messageData) => {
    return axios.post(`https://musicthingy.herokuapp.com/api/chat/conversation/${messageData.room}/new-message`, { messageData })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
}