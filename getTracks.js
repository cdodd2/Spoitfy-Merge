const apiPrefix = 'https://api.spotify.com/v1';

export default async ({q, token,}) => {
    const searchUrl = `${apiPrefix}/playlists/${q}/tracks?offset=0&limit=100&market=ES`;
    // console.log('starting search, searchURL is ' + searchUrl);
    const params = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await fetch(searchUrl, params);
    const jsonObj = await res.json();

    if (!res.ok){
        return [];
    }

    const { items } = jsonObj;

    
    console.log ('the json results returned is \n' + jsonObj.items );

    return items.map(item => ({
        id: item.track.id,
        title: item.track.name,
        imageUri: item.track.album.images
            ? item.track.album.images[0].url
            : undefined
    }));

};