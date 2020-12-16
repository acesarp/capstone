import axios from 'axios';
import ClientModel from "./Models/ClientModel";
const serverUrl = process.env.REACT_APP_SERVER_URL;

/**
 * 
 * @param {String} userName_ 
 * @param {String} password_
 * @returns {Object} user if authorized
 */
async function authorizeUser(userName_, password_) {

    const requestUrl = `${serverUrl}/users/authorize/${userName_}/${password_}`;
    //console.log("loginHandler()", requestUrl);
    
    const result = await axios.get(requestUrl);
    console.log("loginHandler() ===>", result.data.user);
    console.error(result);
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("userId", result.data.user.userId);
    localStorage.setItem('isloggedIn', true);

    return result.data.user;
}


/**
 * 
 * @param {String} userId_
 * @returns {Object} data
 */
async function logout(userId_) {

    const response = await axios.get(`${serverUrl}/users/logout/${userId_}`);
        if (response.status === 200) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.setItem('isloggedIn', false);
            const cloneState = this.state;
            cloneState.isUserLoggedIn = false;
            this.setState(cloneState);
        }            

    return response.data;
}


/**
 * @param {String} userId_
 * @param {String} token_ 
 */
async function getUserData(userId_, token_) {
    try {
        console.log("Getting user...");
        const response = await axios.get(`${serverUrl}/users/${userId_}/${token_}`);
        console.log(response.data);

        return response.data[0];
    }
    catch (error) {
        console.error(error);
        return error;
    }
}

/**
 * 
 * @param {ClientModel} user_
 * @returns {Object} data
 */
async function postUser(user_) {
    const method = localStorage.getItem("token") ? "PUT" : "POST"; // if no id is passed, POST will be used to create new record
    
    const result = await axios({
            method: method,
        url: `${serverUrl}/users/${localStorage.getItem("token")}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: user_.toJSON()
        })
        .catch ((error) => {
            console.error(error);
        });
    return result && result.data;
}



export { getUserData, postUser, authorizeUser, logout };