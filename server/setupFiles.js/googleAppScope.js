
import { google } from 'googleapis';
import appconfig from './appconfig.json';
import axios from 'axios';

const googleConfig = {
    clientId: appconfig.googlecredentials['OAuth2.0'].clientid,
    clientSecret: appconfig.googlecredentials['OAuth2.0'].clientsecret,
    redirect: 'http://mac.guto.ca/google-auth' // this must match your google api settings
};

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];


/*************/
/** HELPERS **/
/*************/

function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    });
}

function getGooglePlusApi(auth) {
    return google.plus({ version: 'v1', auth });
}

/**********/
/** MAIN **/
/**********/

/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */
function urlGoogle() {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
}

/**
 * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */
async function getGoogleAccountFromCode(code) {
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    const auth = createConnection();
    auth.setCredentials(tokens);
    const plus = getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    return {
        id: userGoogleId,
        email: userGoogleEmail,
        tokens: tokens,
    };
}

async function getAccessTokenFromCode(code) {
    const { data } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
            client_id: appconfig.googlecredentials['OAuth2.0'].clientid,
            client_secret: appconfig.googlecredentials['OAuth2.0'].clientsecret,
            redirect_uri: 'https://.com/authenticate/google',
            grant_type: 'authorization_code',
            code
        },
    });
    console.log(data); // { access_token, expires_in, token_type, refresh_token }
    return data.access_token;
};