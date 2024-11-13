// src/screens/TambahBuku.tsx
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {Book} from '../types';

type TambahBukuNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TambahBuku'
>;

interface TambahBukuProps {
  navigation: TambahBukuNavigationProp;
}

const apiUrl = 'https://671af662acf9aa94f6ac293f.mockapi.io/books';

export default function TambahBuku({navigation}: TambahBukuProps) {
  const [formData, setFormData] = useState<Omit<Book, 'id'>>({
    coverBuku: '',
    judulBuku: '',
    penulis: '',
    penerbit: '',
    genre: '',
    tahunTerbit: '',
  });

  const handleChange = (name: keyof Omit<Book, 'id'>, value: string) => {
    setFormData({...formData, [name]: value});
  };

  const addBook = async () => {
    await axios.post(apiUrl, formData);
    navigation.navigate('BukuItem');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cover Buku"
        onChangeText={value => handleChange('coverBuku', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Judul Buku"
        onChangeText={value => handleChange('judulBuku', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Penulis"
        onChangeText={value => handleChange('penulis', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Penerbit"
        onChangeText={value => handleChange('penerbit', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Genre"
        onChangeText={value => handleChange('genre', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Tahun Terbit"
        onChangeText={value => handleChange('tahunTerbit', value)}
        style={styles.input}
      />
      <Button title="Tambah" onPress={addBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  input: {borderBottomWidth: 1, marginBottom: 10, padding: 8},
});
