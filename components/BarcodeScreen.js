import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, Platform, SafeAreaView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import ContextAuth from "./InfoProvider";
import style from '../components/AppStyle'

import * as Permissions from "expo-permissions";

export default function BarcodeScreen({ nativation }) {
  const authContext = useContext(ContextAuth);
  const [scanned, setScanned] = useState(false);

  return (
      scanned ? (
        <SafeAreaView style={style.container} >
          <View>
            <Text>Acesso concedido</Text>
            

          </View>
          <Button title="ok" onPress={() => setScanned(false)} />
        </SafeAreaView>
      ) : (
        <Barcode scanned={scanned} setScanned={setScanned} />
      )
  );
}

function Barcode({ scanned, setScanned }) {
  const authContext = useContext(ContextAuth);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS.toLowerCase() === "web") {
        setHasPermission(true);
      } else {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setHasPermission(status === "granted");
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    (async () => {
      const obj = JSON.parse(data);

      const token = await authContext.state.user.getIdToken();
      setScanned(true);
      authContext.action.fechingURL(
        `https://portaoeletronico.herokuapp.com/api/portao/abre/${obj._id}?key=${obj.key}&email=${authContext.state.user.email}`,
        token
      );
    })();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BarCodeScanner
      key="camera"
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    ></BarCodeScanner>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
