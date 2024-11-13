import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { Book } from '../types';

type EditBukuNavigationProp = StackNavigationProp<RootStackParamList, 'EditBuku'>;
type EditBukuRouteProp = RouteProp<RootStackParamList, 'EditBuku'>;

interface EditBukuProps {
  navigation: EditBukuNavigationProp;
  route: EditBukuRouteProp;
}

const apiUrl = 'https://671af662acf9aa94f6ac293f.mockapi.io/books';

export default function EditBuku({ route, navigation }: EditBukuProps) {
  const { bookId } = route.params;
  const [formData, setFormData] = useState<Omit<Book, 'id'>>({
    coverBuku: '',
    judulBuku: '',
    penulis: '',
    penerbit: '',
    genre: '',
    tahunTerbit: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get<Book>(`${apiUrl}/${bookId}`);
        setFormData(response.data);
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to load book data');
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleChange = (name: keyof Omit<Book, 'id'>, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const editBook = async () => {
    try {
      await axios.put(`${apiUrl}/${bookId}`, formData);
      Alert.alert('Success', 'Book edited successfully');
      navigation.navigate('BukuItem');
    } catch (error) {
      Alert.alert('Error', 'Failed to edit book');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cover Buku"
        value={formData.coverBuku}
        onChangeText={value => handleChange('coverBuku', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Judul Buku"
        value={formData.judulBuku}
        onChangeText={value => handleChange('judulBuku', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Penulis"
        value={formData.penulis}
        onChangeText={value => handleChange('penulis', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Penerbit"
        value={formData.penerbit}
        onChangeText={value => handleChange('penerbit', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Genre"
        value={formData.genre}
        onChangeText={value => handleChange('genre', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Tahun Terbit"
        value={formData.tahunTerbit}
        onChangeText={value => handleChange('tahunTerbit', value)}
        style={styles.input}
      />
      <Button title="Edit" onPress={editBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
});
