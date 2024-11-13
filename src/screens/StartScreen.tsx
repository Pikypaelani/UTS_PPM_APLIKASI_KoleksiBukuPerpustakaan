// src/screens/StartScreen.tsx
import React from 'react';
import {View, Text, Button, ImageBackground, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type StartScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Start'
>;

interface StartScreenProps {
  navigation: StartScreenNavigationProp;
}

export default function StartScreen({navigation}: StartScreenProps) {
  return (
    <ImageBackground
      source={require('../assets/bgfiky.png')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>KOLEKSI BUKU</Text>
        <Button
          title="Mulai"
          color="#ff8c00"
          onPress={() => navigation.navigate('BukuItem')}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
});
