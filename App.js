import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

function PlaylistScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Playlists Available</Text>
      <Button
        title="Select Playlists"
        onPress={() => navigation.navigate('PlaylistName')}
      />
    </View>
  );
}

function PlaylistNameScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Name your new playlist:</Text>
      <TextInput
        style={{height: 40}}
        placeholder="Playlist Name"
        defaultValue={''}
      />
      <Button
        title="Enter Name"
        onPress={() => navigation.navigate('Finish')}
      />
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

function App() {
  return (
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

export default App;