import { TouchableWithoutFeedbackBase } from 'react-native';
import getTracks from './getTracks';
export default async (selectedPlaylists, token) => {




    






    var map = new Map();
    selectedPlaylists = [];
    selectedPlaylists.push(map.set('id', '37i9dQZF1DWSkMjlBZAZ07'));
    selectedPlaylists.push(map.set('id', '37i9dQZF1DWSkMjlBZAZ07'));
    

    var trackLists = [];

    console.log("Selected playlists length is: " + selectedPlaylists.length);


    
    
    for (var i = 0; i < selectedPlaylists.length; i++){
        console.log("The playlistID is : " + selectedPlaylists[i].get('id'));
        var tracks = await getTracks(0, "37i9dQZF1DWSkMjlBZAZ07", token);
        trackLists.push(tracks);
        console.log("tracks length is: " + tracks.length);

    }


    var finalPlaylist = [];
    for (var i = 0; i < trackLists.length; i++){
        finalPlaylist = randomMerge(finalPlaylist, trackLists[i]);
    }

    return finalPlaylist;
};
    





    function randomMerge(playlistOne, playlistTwo){
        var finalList = [];
        while (playlistOne.length != 0 || playlistTwo.length != 0){
            if (playlistOne.length == 0){
                index = Math.floor(Math.random() * playlistTwo.length);
                finalList.push(playlistTwo[index]);
                playlistTwo.splice(index, 1);
            }
            else if (playlistTwo.length == 0){
                index = Math.floor(Math.random() * playlistOne.length);
                finalList.push(playlistOne[index]);
                playlistOne.splice(index, 1);
            }
            else{
                var randomList = Math.floor(Math.random() * 2);
                if (randomList == 0){
                    index = Math.floor(Math.random() * playlistOne.length);
                    finalList.push(playlistOne[index]);
                    playlistOne.splice(index, 1);
                }
                else{
                    index = Math.floor(Math.random() * playlistTwo.length);
                    finalList.push(playlistTwo[index]);
                    playlistTwo.splice(index, 1);
                }
            }
        }
        return finalList;
    }