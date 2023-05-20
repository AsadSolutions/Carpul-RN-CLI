import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import {useSelector} from 'react-redux';
import {selectDestination, selectOrigin} from '../slices/navSlice';

const OfferRideScreen = ({navigation}) => {
  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  const handleOfferRide = async () => {
    try {
      const response = await fetch('http://localhost:3000/rides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickupLocation: origin,
          dropoffLocation: destination,
          availableSeats: Number(seats),
          price: Number(price),
        }),
      });

      if (response.ok) {
        navigation.goBack();
      } else {
        throw new Error('Failed to save ride');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}>
        <View style={tw`flex justify-between`}>
          <View style={tw`p-5`}>
            <Text style={tw`text-lg font-semibold mb-2`}>Offer a Ride</Text>
            <View style={tw`bg-gray-200 p-2 rounded-md mb-2`}>
              <Text style={tw`text-lg`}>{origin.description}</Text>
            </View>
            <View style={tw`bg-gray-200 p-2 rounded-md`}>
              <Text style={tw`text-lg`}>{destination.description}</Text>
            </View>
          </View>
          <View style={tw`p-5`}>
            <Text style={tw`text-lg font-semibold mb-2`}>
              Enter number of available seats
            </Text>
            <TextInput
              placeholder="Seats"
              value={seats}
              onChangeText={setSeats}
              keyboardType="numeric"
              style={tw`p-2 border rounded-md`}
            />
            <Text style={tw`text-lg font-semibold mt-4 mb-2`}>
              Enter a price (in GBP)
            </Text>
            <TextInput
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              style={tw`p-2 border rounded-md`}
            />
          </View>
          <TouchableOpacity
            disabled={!price || !seats}
            onPress={handleOfferRide}
            style={tw`bg-black py-3 px-10 rounded-full ${
              !price || !seats ? 'opacity-50' : ''
            }`}>
            <Text style={tw`text-white text-lg font-semibold`}>Offer Ride</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OfferRideScreen;
