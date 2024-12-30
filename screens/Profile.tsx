import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AuthenticationContext } from '../context/context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackNavigationProp } from '../types/navigation';
import { jwtDecode } from 'jwt-decode';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Profile() {
  const { token, setToken } = React.useContext(AuthenticationContext);
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [userData, setUserData] = useState<any>({
    email: '',
    username: '',
    password: '',
    name: {
      firstname: '',
      lastname: '',
    },
    address: {
      city: '',
      street: '',
      number: '',
      zipcode: '',
      geolocation: {
        lat: '',
        long: '',
      },
    },
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const decoded = jwtDecode(token);
  const id = Number(decoded.sub);
  const handleLogout = () => {
    setToken('');
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/users/' + id)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <View className="space-y-4">
          {/* Header */}
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="w-16 h-16 rounded-full bg-blue-500 items-center justify-center">
                  <Text className="text-white text-2xl font-bold">
                    {userData.username.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View className="ml-4">
                  <Text className="text-xl font-bold">
                    {userData.name.firstname} {userData.name.lastname}
                  </Text>
                  <Text className="text-gray-500">@{userData.username}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Icon name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View className="flex-col gap-3 mt-5">
              <View className="flex-row ">
                <Text className="font-bold w-28 text-xl">Name:</Text>
                <Text className="text-xl">
                  {userData.name.firstname} {userData.name.lastname}
                </Text>
              </View>

              <View className="flex-row">
                <Text className="font-bold w-28 text-xl">Username:</Text>
                <Text className="text-xl">{userData.username}</Text>
              </View>

              <View className="flex-row">
                <Text className="font-bold w-28 text-xl">Email:</Text>
                <Text className="text-xl">{userData.email}</Text>
              </View>

              <View className="flex-row">
                <Text className="font-bold w-28 text-xl">Phone:</Text>
                <Text className="text-xl">{userData.phone}</Text>
              </View>

              <View className="space-y-2">
                <View className="flex-row">
                  <Text className="font-bold w-28 text-xl">Address:</Text>
                  <Text className="text-xl">
                    {userData.address.number}, {userData.address.street},{' '}
                    {userData.address.city}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
