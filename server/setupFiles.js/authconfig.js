import { google } from 'googleapis';
import appconfig from './appconfig.json';

const googleConfig = {
    clientId: appconfig.googlecredentials['OAuth2.0'].clientid,
    clientSecret: appconfig.googlecredentials['OAuth2.0'].clientsecret,
    redirect: 'http://mac.guto.ca/google-auth' // this must match your google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}