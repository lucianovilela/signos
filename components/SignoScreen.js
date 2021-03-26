import * as React from 'react';
import { useState, useContext } from 'react';

import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {
  Input,
  Button,
  SocialIcon,
  SearchBar,
  Text,
  Avatar,
  Card,
  Image,
} from 'react-native-elements';

import * as WebBrowser from 'expo-web-browser';

import ContextAuth from "./InfoProvider";


const InfoPessoal = ({ info }) => (
  <Card containerStyle={{alignContent:"center"}}>
    <Card.Image
    source={{ uri: info.imagem }}
        style={{ width: 200, height: 200 }}
        PlaceholderContent={<ActivityIndicator/>}
      />
    <Card.Divider/>
    <Card.Title>{info?.info?.fullName || info?.info?.name}</Card.Title>
    <Text>{info?.signo?.signo}</Text>
    <Text>{info?.info?.birthDate?.date}</Text>
    <Text>{info?.info?.birthDate?.age} Anos </Text>
    <Button title="info" onPress={()=>{ WebBrowser.openBrowserAsync(info.url)}}/>
  </Card>
);

function SignoScreen({ navigation, route }) {
  const authContext = useContext(ContextAuth);

  const [text, setText] = useState('');
  const getInfo = async () => {
    await authContext.action.fechingURL(`https://signos-celebridades.herokuapp.com/celeb?nome=${text}`,undefined)
  }
  return (
    <View >
      <SearchBar onChangeText={(text) => setText(text)} value={text} />
      <Button title="Pesquisar" onPress={getInfo} />
      {authContext.state.info ? <InfoPessoal info={authContext.state.info} /> : <View />}
    </View>
  );
}

export default SignoScreen;
