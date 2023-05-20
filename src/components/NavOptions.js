import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../slices/navSlice';

const data = [
  {
    id: '123',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('MapScreen')}
          style={tw`p-2 pl-30 pb-8 pt-3 bg-gray-200 m-2 rounded-3`}
          disabled={!origin}>
          <View>
            <Image
              style={{width: 120, height: 120, resizeMode: 'contain'}}
              source={{uri: item.image}}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}> {item.title} </Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
