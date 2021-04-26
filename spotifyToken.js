import {decode as atob, encode as btoa} from 'base-64'


const apiPrefix = 'https://accounts.spotify.com/api';

// DO NOT FORGET TO INPUT YOUR CLIENTID AND CLIENT SECRET HERE
const clientId = 'cbe0e9404afd43719e090d8a6f3b77a6';
const clientSecret = '9de69db638cb4ce1b6226421d68c3308';


// step (4) here
const base64Cred = btoa(`${clientId}:${clientSecret}`);
console.log('base64 cred = ' + base64Cred);


export default async () => {
    console.log ('...retrieving token...');
    const apiTokenUrl = `${apiPrefix}/token`;
    const params = {
        method: 'POST',
        headers: {
            Authorization: `Basic ${base64Cred}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
    };

    const res = await fetch(apiTokenUrl, params);
    const jsonObj = await res.json();
    const theToken = jsonObj.access_token;


    console.log ('Your token is = ' + theToken);
    return theToken;

}