import * as React from 'react';
import { Component, useState} from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';

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

const K_OPTIONS = [
  {
    item: 'Juventus',
    id: 'JUVE',
  },
  {
    item: 'Real Madrid',
    id: 'RM',
  },
  {
    item: 'Barcelona',
    id: 'BR',
  },
  {
    item: 'PSG',
    id: 'PSG',
  }
]
  const [selectedItems, setSelectedItems] = useState([])
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{textAlign: 'center'}}>Playlists Available</Text>
      <View style={{margin: 30}}>
      {K_OPTIONS.length ? (
        <View>
          <SelectBox
          style={{padding: 10}}
          label="Select multiple"
          options={K_OPTIONS}
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
          onPress={() => navigation.navigate('PlaylistName')}
          />
        </View>
      ) : (
        <Text style={{textAlign: 'center'}}>No Playlists Found!</Text>
      )}
      {selectedItems.map(select => <Text>{select.item}</Text>)}
      </View>
    </View>
  );

  function onMultiChange() {
    return (item) => setSelectedItems(xorBy(selectedItems, [item], 'id'))
  }
}

function PlaylistNameScreen({ navigation }) {

  const [Name, setName] = useState("");


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Name your new playlist:</Text>
      <TextInput
        style={{height: 40}}
        placeholder="Playlist Name"
        defaultValue={''}
        value={Name}
        onChangeText={setName}
      />
      <Text>Select a merge type:</Text>
      <Button
        title="Random Merge"
        onPress={() => navigation.navigate('Finish')}
      />
      <Button
        title="Alternating Merge"
        onPress={() => navigation.navigate('Finish')}
      />
      <Text>{Name}</Text>
    </View>
  );
}

function FinishScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Playlist Created</Text>
      <Text>Open Spotify to see your new playlist</Text>
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
        items: [],
        offset: 0,
        isFetching: false,
        query: 'Led Zeppelin',
        token: null,
    };

}
  render () {

    return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none" mode="modal">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Playlists" component={PlaylistScreen} />
        <Stack.Screen name="PlaylistName" component={PlaylistNameScreen} />
        <Stack.Screen name="Finish" component={FinishScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

