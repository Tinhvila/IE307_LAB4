import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationContext } from '../context/context';
import * as Yup from 'yup';
import { ProfileStackNavigationProp } from '../types/navigation';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile() {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileStackNavigationProp>();
  const { token } = React.useContext(AuthenticationContext);
  const decoded = jwtDecode(token);
  const id = decoded.sub;
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    houseNumber: 0,
    street: '',
    city: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/users/${id}`
        );
        const userData = response.data;
        console.log(userData);

        setFormData({
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
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  const handleConfirm = async () => {
    try {
      // Validate email format
      const emailSchema = Yup.string().email();
      await emailSchema.validate(formData.email);

      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.username) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      // Save updatedProfile to AsyncStorage
      await AsyncStorage.setItem('updatedProfile', JSON.stringify(formData));
      navigation.goBack();
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Error', 'Invalid email format');
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesignIcon name="left" size={24} />
          </TouchableOpacity>
          <Text className="text-xl font-bold">{t('profile.edit-profile')}</Text>
          <TouchableOpacity onPress={handleConfirm}>
            <Text className="text-blue-500 font-bold">Save</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View className="p-4 space-y-4">
          {/* Name Fields */}
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="text-gray-600">{t('profile.first-name')}</Text>
              <TextInput
                value={formData.firstName}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, firstName: text }))
                }
                className="border p-2 rounded-lg mt-1"
                placeholder="First name"
              />
            </View>
            <View className="flex-1">
              <Text className="text-gray-600">{t('profile.last-name')}</Text>
              <TextInput
                value={formData.lastName}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, lastName: text }))
                }
                className="border p-2 rounded-lg mt-1"
                placeholder="Last name"
              />
            </View>
          </View>

          {/* Username Field */}
          <View>
            <Text className="text-gray-600">{t('profile.username')}</Text>
            <TextInput
              value={formData.username}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, username: text }))
              }
              className="border p-2 rounded-lg mt-1"
              placeholder="Username"
            />
          </View>

          {/* Email Field */}
          <View>
            <Text className="text-gray-600">{t('profile.email')}</Text>
            <TextInput
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              className="border p-2 rounded-lg mt-1"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone Number Field */}
          <View>
            <Text className="text-gray-600">{t('profile.phone-number')}</Text>
            <TextInput
              value={formData.phoneNumber}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, phoneNumber: text }))
              }
              className="border p-2 rounded-lg mt-1"
              placeholder="Phone number"
              keyboardType="phone-pad"
            />
          </View>

          {/* house number */}
          <View>
            <Text className="text-gray-600">House Number</Text>
            <TextInput
              value={formData.houseNumber.toString()}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, houseNumber: Number(text) }))
              }
              className="border p-2 rounded-lg mt-1"
              placeholder="House number"
              multiline
            />
          </View>

          {/* street */}
          <View>
            <Text className="text-gray-600">Street</Text>
            <TextInput
              value={formData.street}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, street: text }))
              }
              className="border p-2 rounded-lg mt-1"
              placeholder="Street"
              multiline
            />
          </View>

          {/* City */}
          <View>
            <Text className="text-gray-600">City</Text>
            <TextInput
              value={formData.city}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, city: text }))
              }
              className="border p-2 rounded-lg mt-1"
              placeholder="City"
              multiline
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
