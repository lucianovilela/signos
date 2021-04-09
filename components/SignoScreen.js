import * as React from 'react';
import { useState, useContext } from 'react';
import moment from 'moment';

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
  <Card containerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
    <Card.Image
      source={{ uri: info.imagem }}
      style={{ width: 200, height: 200 }}
      PlaceholderContent={<ActivityIndicator />}
    />
    <Card.Divider />
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Card.Title>{info?.info?.fullName || info?.info?.name}</Card.Title>
      {/*<Image source={ require(`../assets/signos/${info?.signo?.name}.png`) } style={{height:50, width:50}}  />*/}
      <Text>{info?.signo?.signo}</Text>
      <Text>{moment(info?.info?.birthDate?.date).format('DD/MM/YYYY')}</Text>
      <Text>{info?.info?.birthDate?.age} Anos </Text>
      <Button title="info" onPress={() => { WebBrowser.openBrowserAsync(info.url) }} />
    </View>
  </Card>
);

function SignoScreen({ navigation, route }) {
  const authContext = useContext(ContextAuth);

  const [text, setText] = useState('');
  const getInfo = async () => {
    await authContext.action.fechingURL(text)
  }
  return (
    <View >
      <SearchBar onChangeText={(text) => setText(text)} value={text} />
      <Button title="Pesquisar" onPress={getInfo} />
      {authContext.state.info && !authContext.state.isLoading
        ?
        <InfoPessoal info={authContext.state.info} /> :
        <View />}
      {authContext.state.isLoading ? <ActivityIndicator /> : <View />}
    </View>
  );
}

export default SignoScreen;
