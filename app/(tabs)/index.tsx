import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "@/constants/GooglePlacesAPIKey";

import { View } from "@/components/Themed";
import * as Location from "expo-location";
import { getCurrentLocation } from "@/helpers/getCurrentLocation";
import { useEffect, useRef, useState } from "react";

export default function TabOneScreen() {
  Location.requestForegroundPermissionsAsync();

  const mapRef = useRef();
  const [coord, setCoord] = useState();
  const [destination, setDestination] = useState();

  const getLiveLocation = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    setCoord((prevStatus) => ({
      ...prevStatus,
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 2,
      longitudeDelta: 2,
    }));
  };

  useEffect(() => {
    getLiveLocation();
    console.log(GOOGLE_PLACES_API_KEY);
  }, []);

  // const INITIAL_REGION = {
  //   latitude: 4.710989,
  //   longitude: -74.07209,
  //   latitudeDelta: 2,
  //   longitudeDelta: 2,
  // };

  const moveToLocation = async (latitude, longitude) => {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      2000
    );
  };

  const handlerAddress = (details) => {
    console.log(details);
    let location = {
      latitude: details?.geometry?.location.lat,
      longitude: details?.geometry?.location.lng,
    };
    setDestination(location);
    moveToLocation(location.latitude, location.longitude);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "90%",
          height: 150,
          zIndex: 100,
          overflow: "visible",
          flex: 1,
          marginHorizontal: 10,
          marginVertical: 5,
          // backgroundColor: "red",
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Buscar lugar"
          fetchDetails={true}
          onPress={(data, details = null) => {
            handlerAddress(details);
          }}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "es", // Opcional: establece el idioma
          }}
        />
      </View>
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "80%" }}
        provider={PROVIDER_GOOGLE}
        initialRegion={coord}
        region={{
          latitude: 4.710989,
          longitude: -74.07209,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {coord !== undefined && <Marker coordinate={coord} />}
        {destination !== undefined && <Marker coordinate={destination} />}
      </MapView>
      {/* <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 4.710989,
          longitude: -74.07209,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
        // initialRegion={INITIAL_REGION}
        initialRegion={coord}
        showsUserLocation={true}
        showsMyLocationButton={true}
        // showsCompass={true}
        // toolbarEnabled={true}
        // zoomEnabled={true}
        // rotateEnabled={true}
        // userInterfaceStyle="dark"
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
        {coord !== undefined && <Marker coordinate={coord} />}
      </MapView> */}
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
  searchContainer: {
    width: "100%",
    zIndex: 1,
    flex: 0.5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
