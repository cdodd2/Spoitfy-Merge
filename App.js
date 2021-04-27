import * as React from 'react';
import { Component, useState, useEffect} from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import spotifyToken from "./spotifyToken.js";
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import getPlaylists from './getPlaylists.js';

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login to Spotify</Text>
      <TextInput
        style={{height: 40}}
        placeholder="Username"
        defaultValue={''}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Password"
        defaultValue={''}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('Playlists')}
      />
    </View>
  );
}

function PlaylistScreen({navigation}) {

const [thistoken, setToken] = useState('')
const [isfetching, setFetch] = useState(false)

async function populatePlaylists() {
  setFetch(true)
  const playlists = await getPlaylists({
    q: '1223453181',
    token: thistoken,
  })
  //console.log(playlists)
  setOptions(playlists)   
  //console.log(playlists)
  setFetch(false)
} 



async function fetchToken() {
  setToken(await spotifyToken())
}

useEffect(() => {
  populatePlaylists()
}, [thistoken])


useEffect(() => { 
  const getData = async () => {
    await fetchToken();
    //populatePlaylists();
  }
  getData()
}, []);

const [options, setOptions] = useState([
    {
      id: "",
      item: ""
    }
  ]
  )

  const [selectedItems, setSelectedItems] = useState([])

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{textAlign: 'center'}}>Playlists Available</Text>
      <View style={{margin: 30}}>
      {isfetching ? <Text style={{textAlign: 'center'}}>Fetching Playlists...</Text>
      : options.length ? (
        <View>
          <SelectBox
            style={{padding: 10}}
            label="Select multiple"
            options={options}
            selectedValues={selectedItems}
            onMultiSelect={onMultiChange()}
            onTapClose={onMultiChange()}
            toggleIconColor={'#1DB954'}
            searchIconColor={'#1DB954'}
            arrowIconColor={'#1DB954'}
            multiOptionContainerStyle={{backgroundColor: '#1DB954'}}

            isMulti
          /> 
          <Button
          title="Select Playlists"
          onPress={() => navigation.navigate('PlaylistDisp')}
          />
        </View>
      ) : (
        <Text style={{textAlign: 'center'}}>No Playlists Found!</Text>
      ) 
      }
      {selectedItems.map(select => <Text>{select.item}</Text>)}
      </View>
    </View>
  );

  function playlistButtonPressed() {

  }

  function onMultiChange() {
    return (item) => setSelectedItems(xorBy(selectedItems, [item], 'id'))
  }
}

function PlaylistDispScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your new playlist:</Text>
      <Button
        title="Create Another Playlist"
        onPress={() => navigation.navigate('Playlists')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };

}
  render () {

    return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none" mode="modal">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Playlists" component={PlaylistScreen} />
        <Stack.Screen name="PlaylistDisp" component={PlaylistDispScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

