import axios from "axios";

const getSearchResults = (query) => {
    return axios.get(`https://musicthingy.herokuapp.com/api/search?q=${query}`)
}

export default getSearchResults