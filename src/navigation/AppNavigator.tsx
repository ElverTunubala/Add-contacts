import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ContactListScreen from '../screens/ContactListScreen';
import NewContactScreen from '../screens/NewContactScreen';
import ContactDetailsScreen from '../screens/ContactDetailsScreen';
import { Contact } from '../interfaces/Contact';
import MapScreen from '../screens/MapScreen';

export type RootStackParamList = {
  ContactList: undefined;
  ContactDetails: { contact: Contact };
  NewContact: { location: { latitude: number; longitude: number } } | undefined; 
  // NewContact: undefined;
  ContactMaps: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="ContactList">
      <Stack.Screen name="ContactList" component={ContactListScreen} />
      <Stack.Screen name="NewContact" component={NewContactScreen} />
      <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} />
      <Stack.Screen name="ContactMaps" component={MapScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
