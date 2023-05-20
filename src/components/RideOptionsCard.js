import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import {Image} from 'react-native-elements';
import car from '../assets/car.png';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectTravelTimeInformation} from '../slices/navSlice';
import axios from 'axios';

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const [rides, setRides] = useState([]);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  useEffect(() => {
    axios
      .get('http://localhost:3000/rides')
      .then(response => {
        setRides(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw`flex flex-row pl-15 pr-15 justify-between items-center`}>
        <View style={tw`bg-gray-400 text-white py-4 px-10 rounded m-2`}>
          <Text>select Ride</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('OfferRideScreen')}
          style={tw` bg-blue-300 hover:bg-blue-600 text-white py-4 px-10 rounded m-2 `}>
          <Text>Offer Ride</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={rides}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              item._id === selected?._id ? 'bg-gray-200' : ''
            }`}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={car}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text style={tw` w-40`}>
                {item.dropoffLocation.split(',')[2]}
              </Text>
              <Text>
                {travelTimeInformation?.duration?.text ?? ''} Travel Time
              </Text>
              <Text style={tw` pl-2 text-xl`}>
                {travelTimeInformation?.distance?.text ?? ''}
              </Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'GBP',
              }).format(item.price)}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BookedCar', {price: selected.price})
          }
          disabled={!selected}
          style={{
            backgroundColor: selected ? 'black' : 'gray',
            paddingVertical: 10,
            paddingHorizontal: 20,
            margin: 10,
          }}>
          <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
