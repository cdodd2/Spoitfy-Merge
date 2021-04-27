const apiPrefix = 'https://api.spotify.com/v1';

export default async ({q, token}) => {
    const searchUrl = `${apiPrefix}/users/${q}/playlists?offset=0&limit=50`;
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

    
    //console.log ('the json results returned is \n' + jsonObj.items );

    return items.map(el => ({
        id: el.id,
        item: el.name
    }));

};