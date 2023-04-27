import * as React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { View, FlatList, ActivityIndicator, Platform, TouchableOpacity, WebView } from 'react-native';
import { SearchBar, Text, Card, Image, ListItem, Icon } from 'react-native-elements';

import { publishEvent}  from '../firebaseConfig';


import ContextAuth, { useInfo } from './InfoProvider';
import { createStackNavigator } from '@react-navigation/stack';
import * as  WebBrowser from 'expo-web-browser';
const Stack = createStackNavigator();

const InfoPessoal = () => {
  React.useEffect(() => {
    
    publishEvent('page_view', {
      page_path: '/info',
      page_title: 'info',
    })
  }, []);

  const authContext = useInfo();
  let openShareDialogAsync = async () => {
    if (Platform.OS === 'web') {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };
  return authContext.state.isLoading ? (
    <ActivityIndicator
      width={400}
      height={400}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
      }}
    />
  ) : authContext.state.info.signo ? (
    <Card
      containerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

      }}>
      <Card.Title>
        {authContext.state.info?.info?.fullName ||
          authContext.state.info?.info?.name}
      </Card.Title>
      <Card.Image
        source={{ uri: authContext.state.info.imagem }}
        style={{ width: 200, height: 280 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Card.Divider />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            display: authContext.state.info.signo ? 'flex' : 'none',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{authContext.state.info?.caption}</Text>
          <Text>{authContext.state.info?.signo?.signo}</Text>
          <Image
            source={authContext.state.info?.signo?.image}
            style={{ height: 50, width: 50 }}
          />
          <Text>
            {moment(authContext.state.info?.info?.birthDate?.date).format(
              'MMM, DD YYYY'
            )}
          </Text>
          <Text>Age {authContext.state.info?.info?.birthDate?.age}</Text>
        </View>
        {
          <TouchableOpacity

            onPress={() => {
              WebBrowser.openBrowserAsync(authContext.state.info.url);
            }}>
            <Text style={{ color: '#ffffff' }}>info</Text>

            <Icon name="web" type="material" />
          </TouchableOpacity>
        }
      </View>
    </Card>
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text h3>No one was found 🤔 </Text>
    </View>
  );
};

const AutoCompleteList = ({ text, navigation }) => {
  const authContext = useInfo();

  useEffect(() => {
    (async () => {
      if (text.length > 3) {
        authContext.action.sugestao(text);
      }
    })();
  }, [text]);
  const getInfo = async (item) => {
    publishEvent('search', { search_term: item });

    console.log('consulta', item);
    await authContext.action.fechingURL(item);
    navigation.navigate('result');
  };

  const onPress = (item) => {
    getInfo(item.title);
  };
  return (
    <View>
      <FlatList
        data={authContext.state.sugestao}
        renderItem={({ item }) => (
          <ListItem onPress={() => onPress(item)}>
            <Text>{item.title}</Text>
            
          </ListItem>
        )}
        keyExtractor={(res) => {
          return `${res}`;
        }}
      />
    </View>
  );
};

function PaginaBusca({ navigation, route }) {
  const authContext = useInfo();
  React.useEffect(() => {
    publishEvent('page_view', {
      page_path: '/search',
      page_title: 'search',
    })
  });

  const [text, setText] = useState('');
  return (
    //<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

    <View>
      <SearchBar
        onChangeText={(text) => setText(text)}
        value={text}
        inputStyle={{ padding: 10 }}
      />
      {/* 
        <TouchableOpacity style={styles.button} >
          <Icon
            name="search"
            size={20}
            color="white"
          />
          <Text style={{ color: "#ffffff" }}>search</Text>

        </TouchableOpacity>
        */}
      <AutoCompleteList
        text={text}
        show={true}
        setText={setText}
        navigation={navigation}
      />
    </View>
    // </TouchableWithoutFeedback>
  );
}

function SignoScreen({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="search">
      <Stack.Screen name="search" component={PaginaBusca} />
      <Stack.Screen name="result" component={InfoPessoal} />
    </Stack.Navigator>
  );
}

export default SignoScreen;
