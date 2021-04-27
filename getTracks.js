import spotifyToken from './spotifyToken';
const apiPrefix = 'https://api.spotify.com/v1';


export default async (offset, q, token) => {
    //const token = await spotifyToken();
    console.log("Q Is: " + q);
    console.log("Offset is: " + offset);
    const searchUrl = `${apiPrefix}/playlists/${q}/tracks?offset=${offset}&limit=100&market=ES`;
    // console.log('starting search, searchURL is ' + searchUrl);
    const params = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    
    const res = await fetch(searchUrl, params);
    const jsonObj = await res.json();

    console.log("The token in getTrack is: " + token);

    console.log(res.ok);
    if (!res.ok){
        return [];
    }

    const { items } = jsonObj;

    
    console.log ('the json results returned is \n' + items.total );

    

    return items.map(item => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists[0].name
    }));

};