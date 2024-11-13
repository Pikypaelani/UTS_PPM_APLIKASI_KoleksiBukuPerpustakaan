import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './screens/StartScreen';
import BukuItem from './screens/BukuItem';
import TambahBuku from './screens/TambahBuku';
import EditBuku from './screens/EditBuku';

export type RootStackParamList = {
  Start: undefined;
  BukuItem: undefined;
  TambahBuku: undefined;
  EditBuku: { bookId: string }; // Menyediakan bookId untuk EditBuku
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BukuItem"
          component={BukuItem}
          options={{ title: 'Daftar Buku' }}
        />
        <Stack.Screen
          name="TambahBuku"
          component={TambahBuku}
          options={{ title: 'Tambah Buku' }}
        />
        <Stack.Screen
          name="EditBuku"
          component={EditBuku}
          options={{ title: 'Edit Buku' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
