class Playlist {
    constructor(playlistName, jsonTrackList) {
        this.playlistName = playlistName;



        var array = JSON.parse(jsonTrackList);

        for (var i=0; i<array.length; ++i) {
        
        }



        /*
            Once the json input is ready, find a way to parse through it and add everything to an array in this class


            Example Code -->
                var jsonString = '[{"offspring0":"John"},{"offspring1":"Anna"},{"offspring2":"Peter"}]';
                var array = JSON.parse(jsonString);
                var offsprings = [];
                for (var i=0; i<array.length; ++i) {
                  for (var key in array[i]) {
                    if (key.match(/^offspring[0-9]+$/)) {
                      offsprings.push(array[i][key]);
                    }
                  }
                }



            
        */


    }


    randomMerge(playlistOne, playlistTwo){
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



}