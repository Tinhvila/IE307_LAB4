import { View, Text, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { AuthenticationContext } from '../context/context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackNavigationProp } from '../types/navigation';
import { jwtDecode } from 'jwt-decode';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const { token, setToken } = React.useContext(AuthenticationContext);
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const [profileData, setProfileData] = useState<any>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    houseNumber: 0,
    street: '',
    city: '',
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
      .then((userData) => {
        setProfileData({
          firstName: userData.name.firstname || '',
          lastName: userData.name.lastname || '',
          username: userData.username || '',
          email: userData.email || '',
          phoneNumber: userData.phone || '',
          houseNumber: userData.address.number || 0,
          street: userData.address.street || '',
          city: userData.address.city || '',
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const storedProfile = await AsyncStorage.getItem('updatedProfile');
      if (storedProfile) {
        setProfileData(JSON.parse(storedProfile));
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchProfile);
    return unsubscribe;
  }, [navigation]);

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
                    {profileData.username.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View className="ml-4">
                  <Text className="text-xl font-bold">
                    {profileData.firstName} {profileData.lastName}
                  </Text>
                  <Text className="text-gray-500">@{profileData.username}</Text>
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
                  {profileData.firstName} {profileData.lastName}
                </Text>
              </View>

              <View className="flex-row">
                <Text className="font-bold w-28 text-xl">Username:</Text>
                <Text className="text-xl">{profileData.username}</Text>
              </View>

              <View className="flex-row">
                <Text className="font-bold w-28 text-xl">Email:</Text>
                <Text className="text-xl">{profileData.email}</Text>
              </View>

              <View className="flex-row">
                <Text className="font-bold w-28 text-xl">Phone:</Text>
                <Text className="text-xl">{profileData.phoneNumber}</Text>
              </View>

              <View className="space-y-2">
                <View className="flex-row">
                  <Text className="font-bold w-28 text-xl">Address:</Text>
                  <Text className="text-xl">
                    {profileData.houseNumber}, {profileData.street},{' '}
                    {profileData.city}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="p-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-black p-2 rounded-lg items-center justify-center"
        >
          <Text className="text-white text-xl font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
