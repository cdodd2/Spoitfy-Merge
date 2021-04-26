const apiPrefix = 'https://api.spotify.com/v1';

export default async ({offset, limit, q, token,}) => {
    const searchUrl = `${apiPrefix}/users/${q}/playlists?offset=${offset}&limit=${limit}`;
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
        id: item.id,
        title: item.name,
        imageUri: item.images
            ? item.images[0].url
            : undefined
    }));

};