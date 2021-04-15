import * as React from 'react';
import { useState, useContext, useEffect } from 'react';

import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import {
  Input,
  Button,
  SocialIcon,
  SearchBar,
  Text,
  Avatar,
  Card,
  Image,
  ListItem
} from 'react-native-elements';

import ContextAuth from "./InfoProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

function ListScreen({ navigation, route }) {
  const authContext = useContext(ContextAuth);

  const [text, setText] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    (async()=>{
        await authContext.action.loadList();
        setList(authContext.state.lista);
    })();

  }, []);

  const onChangeText=(text)=>{
    const lista = authContext.state.lista.filter((item)=>{
      try {
        return item.info?.name?.toLowerCase().contains(text.toLowerCase());
      } catch (error) {
        return false;
      }
    });
    setList(lista);
    setText(text);
  };

  return (
    <View style={{flex:1}}>
      <SearchBar onChangeText={onChangeText } value={text} />
      <View >
        <FlatList
          data={authContext.state.lista}
          renderItem={({item, index})=>(
          <ListItem key={index} bottomDivider>
              <Avatar source={{ uri: item.imagem }} />
              <ListItem.Content>
                <ListItem.Title>{item.info?.name}</ListItem.Title>
                <ListItem.Subtitle>{item.signo?.signo}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
          keyExtractor={({index})=>(index)}
      />
      </View>
    </View>
  );
}

export default ListScreen;
