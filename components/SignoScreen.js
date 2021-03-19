import * as React from 'react';
import { useState } from 'react';

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

const InfoPessoal = ({ info }) => (
  <Card containerStyle={{alignContent:"center"}}>
    <Card.Image
    source={{ uri: info.imagem }}
        style={{ width: 200, height: 200 }}
        PlaceholderContent={<ActivityIndicator/>}
      />
    <Card.Divider/>
    <Card.Title>{info.info.fullName || info.info.name}</Card.Title>
    <Text>{info.signo.signo}</Text>
    <Text>{info.info.birthDate?.date}</Text>
    <Text>{info.info.birthDate?.age} Anos </Text>
    <Button title="info" onPress={()=>{ WebBrowser.openBrowserAsync(info.url)}}/>
  </Card>
);

function SignoScreen({ navigation, route }) {
  const [text, setText] = useState('');

  const [info, setInfo] = useState(undefined);
  const getInfo = () => {
    if(text) 
      fetch(`https://signos-celebridades.herokuapp.com/celeb?nome=${text}`, {
      method: 'GET',
    })
      .then((r) => r.json())
      .then((r) => setInfo(r));
  };
  return (
    <View >
      <SearchBar onChangeText={(text) => setText(text)} value={text} />
      <Button title="Pesquisar" onPress={getInfo} />
      {info ? <InfoPessoal info={info} /> : <View />}
    </View>
  );
}

export default SignoScreen;
