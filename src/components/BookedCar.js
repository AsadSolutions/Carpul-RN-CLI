import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const BookedCar = ({navigation}) => {
  const handleCompleteRide = () => {
    alert('Ride completed!');
    navigation.goBack();
  };

  const handleChatWithDriver = () => {
    // navigate to ChatScreen
    navigation.navigate('ChatScreen');
  };

  return (
    <View style={tw`bg-white flex-1 items-center justify-center`}>
      <Text style={tw`text-2xl font-semibold mb-5`}>
        You have booked a Ride
      </Text>
      <TouchableOpacity
        onPress={handleCompleteRide}
        style={tw`bg-black py-2 px-5 rounded-full mb-5`}>
        <Text style={tw`text-white text-lg`}>Complete Ride</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleChatWithDriver}
        style={tw`bg-blue-500 py-2 px-5 rounded-full`}>
        <Text style={tw`text-white text-lg`}>Chat with Driver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookedCar;
