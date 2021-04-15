import {  StyleSheet } from 'react-native';
import Constants from 'expo-constants';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    margin: 10,
    marginBottom: 0,
    padding: 10,
    width: '70%',
    justifyContent:'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
    backgroundColor: '#000055',
    color: 'white',
    borderRadius: 15,
    flexDirection:'row'
  },
});

export default styles;