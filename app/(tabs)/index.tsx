import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import { View } from "@/components/Themed";
import * as Location from "expo-location";

export default function TabOneScreen() {
  Location.requestForegroundPermissionsAsync();

  // navigator.geolocation.

  const INITIAL_REGION = {
    latitude: 4.710989,
    longitude: -74.07209,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

  return (
    <View style={styles.container}>
      {/* <MapView /> */}
      <MapView
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 4.710989,
          longitude: -74.07209,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        toolbarEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}
        userInterfaceStyle="dark"
        // pointForCoordinate={}
        // showsTraffic={true}
        // onMapReady={() => {
        //   PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        //   ).then((granted) => {
        //     alert(granted); // just to ensure that permissions were granted
        //   });
        // }}
      >
        <Marker
          key={1}
          coordinate={{
            latitude: 4.710989,
            longitude: -74.07209,
            // latitudeDelta: 2,
            // longitudeDelta: 2,
          }}
          title="sasd"
          description="asdas"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
