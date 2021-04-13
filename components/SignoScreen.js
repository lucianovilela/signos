import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { sujestao } from '../services/pesquisa'
import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import {
  SearchBar,
  Text,
  Card,
  Image,
  ListItem,
  Icon
} from 'react-native-elements';

import * as WebBrowser from 'expo-web-browser';
import styles from './AppStyle';

import ContextAuth from "./InfoProvider";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


const InfoPessoal = () => {
  const authContext = useContext(ContextAuth);

  return (
    authContext.state.isLoading ?
      <ActivityIndicator width={200} height={200} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} /> :
      authContext.state.info ?
        <Card containerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Card.Image
            source={{ uri: authContext.state.info.imagem }}
            style={{ width: 200, height: 280 }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Card.Divider />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Card.Title>{authContext.state.info?.info?.fullName || authContext.state.info?.info?.name}</Card.Title>
            <Image source={authContext.state.info?.signo?.image} style={{ height: 50, width: 50 }} />
            <Text>{authContext.state.info?.signo?.signo}</Text>
            <Text>{moment(authContext.state.info?.info?.birthDate?.date).format('MMM, DD YYYY')}</Text>
            <Text>{authContext.state.info?.info?.birthDate?.age} Anos </Text>
            <TouchableOpacity  style={styles.button} onPress={() => { WebBrowser.openBrowserAsync(authContext.state.info.url) }} >
              <Text style={{color:"#ffffff"}}>info</Text>
            </TouchableOpacity>
          </View>
        </Card>
        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text h3>No one was found 🤔 </Text>
        </View>
  );
};

const AutoCompleteList = ({ text, setText }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      if (text.length > 3) { setList(await sujestao(text)) }
      else {
        setList([])
      }
    })();


  }, [text]);
  const onPress = (item) => {
    setText(item);
  }
  return (
    <View >
      <FlatList
        data={list.results}
        renderItem={
          ({ item }) => (<ListItem onPress={() => onPress(item)}><Text>{item}</Text></ListItem>)
        }
        keyExtractor={(res) => { return `${res}` }}
      />

    </View>
  );
}

function PaginaBusca({ navigation, route }) {
  const authContext = useContext(ContextAuth);

  const [text, setText] = useState('');
  const getInfo = async () => {
    await authContext.action.fechingURL(text);
    navigation.navigate('result');
  }
  return (
    <View >
      <SearchBar onChangeText={(text) => setText(text)} value={text} />
      <TouchableOpacity style={styles.button} onPress={getInfo}>
        <Icon
          name="search"
          size={20}
          color="white"
        />
        <Text style={{color:"#ffffff"}}>search</Text>

      </TouchableOpacity>
      <AutoCompleteList text={text} show={true} setText={setText} />
    </View>
  );
}

function SignoScreen({ }) {
  return (
    <Stack.Navigator initialRouteName="search">
      <Stack.Screen name="search" component={PaginaBusca} />
      <Stack.Screen name="result" component={InfoPessoal} />
    </Stack.Navigator>
  )

}

export default SignoScreen;
