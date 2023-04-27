 import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Input,
  Button,
  SocialIcon,
  SearchBar,
  Text,
  Avatar,
  Card,
  Image,
  ListItem,
  Icon,
} from 'react-native-elements';

import { useInfo } from './InfoProvider';

function ListScreen({ navigation, route }) {
  const authContext = useInfo();

  const [text, setText] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      setList(authContext.state.lista);
    })();
  }, [authContext.state.lista]);

  const onChangeText = (text) => {
    setText(text);
    const lista = authContext.state.lista.filter((item) => {
      try {
        return item.info?.name?.toLowerCase().includes(text.toLowerCase());
      } catch (error) {
        return false;
      }
    });
    setList(lista);
  };

  const onClickDelete = async (item) => {
    const tempList = authContext.state.lista.filter((i) => {
      return !(i === item);
    });

    await authContext.action.saveList(tempList);
  };

  const onSelectItem=async(item)=>{
    authContext.action.selectInfo(item);
    navigation.navigate('result')
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchBar onChangeText={onChangeText} value={text} />
      <View>
        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={()=>onSelectItem(item)}>
              <ListItem key={index} bottomDivider>
                <Avatar source={{ uri: item.imagem }} />
                <ListItem.Content>
                  <ListItem.Title>{item.info?.name}</ListItem.Title>
                  <ListItem.Subtitle>{item.signo?.signo}</ListItem.Subtitle>
                </ListItem.Content>
                <TouchableOpacity onPress={() => onClickDelete(item)}>
                  <Icon name="delete" type="material" />
                </TouchableOpacity>
              </ListItem>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => {
            return index;
          }}
        />
      </View>
    </View>
  );
}

export default ListScreen;
