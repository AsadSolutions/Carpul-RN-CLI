import React, {useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import tw from 'twrnc';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectOrigin,
  selectDestination,
  setTravelTimeInformation,
} from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '@env';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin) return;

    const initialRegion = {
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };

    mapRef.current.animateToRegion(initialRegion);
  }, [origin]);

  useEffect(() => {
    if (!origin || !destination) return;

    // for zoom
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    });

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`,
      )
        .then(res => res.json())
        .then(data => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  if (!origin) {
    return null;
  }

  const coordinate = destination
    ? {
        latitude: destination.location.lat,
        longitude: destination.location.lng,
      }
    : {
        latitude: origin.location.lat,
        longitude: origin.location.lng,
      };

  const title = destination ? 'Destination' : 'Location';

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}>
      {destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor="black"
          strokeWidth={3}
        />
      )}

      <Marker
        coordinate={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
        }}
        title="Origin"
        description={origin.description}
        identifier="origin"
      />
      {destination && (
        <Marker
          coordinate={coordinate}
          title={title}
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
