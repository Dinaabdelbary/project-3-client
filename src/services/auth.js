import axios from 'axios';

const signup = (name, email, password) => {
    return axios.post('https://musicthingy.herokuapp.com/api/auth/signup', { name, email, password });
};

const login = (email, password) => {
    return axios
        .post('https://musicthingy.herokuapp.com/api/auth/login', { email, password })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

const logout = () => {
    return axios
        .delete('https://musicthingy.herokuapp.com/api/auth/logout')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

const loggedin = () => {
    return axios.get('https://musicthingy.herokuapp.com/api/auth/loggedin');
};

export { signup, login, logout, loggedin };
