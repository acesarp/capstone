import axios from 'axios';
//import ClientModel from "./Models/ClientModel";
const serverUrl = process.env.REACT_APP_SERVER_URL;

/**
 * 
 * @param {String} userName_ 
 * @param {String} password_
 * @returns {Object} user if authorized
 */
async function authorizeUser(userName_, password_) {

    const requestUrl = `${serverUrl}/users/authorize/${userName_}/${password_}`;
    try {
        const result = await axios.get(requestUrl);
        console.log("authorizeUser()", result);

        if (result.status === 200) {
            sessionStorage.setItem("token", result.data.token);
            sessionStorage.setItem("userId", result.data.user.userId);
            sessionStorage.setItem('isloggedIn', true);
            return result;
        }
        else {
            return false;
        }
    } catch (error) {
        return error;
    }
}


/**
 * 
 */
async function logout() {

    const response = await axios.get(`${serverUrl}/users/logout/${sessionStorage.getItem("userId")}/${sessionStorage.getItem("token")}`);
    if (response.status === 200) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        sessionStorage.setItem('isloggedIn', false);
    }
    //console.log("response", response);
    return response;
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
async function postUser(user_, token_ = "") {
    const method = token_ ? "PUT" : "POST"; // if no token is passed, POST will be used to create new record
    
    const result = await axios({
            method: method,
        url: `${serverUrl}/users/${token_}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: user_.stringify()
        })
        .catch ((error) => {
            console.error("error " , error);
        });
    console.log(result);
    if (result && !result.data.error) {
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("userId", result.data.user.userId);
        sessionStorage.setItem('isloggedIn', true);
    }
    return result;
}



export { getUserData, postUser, authorizeUser, logout };