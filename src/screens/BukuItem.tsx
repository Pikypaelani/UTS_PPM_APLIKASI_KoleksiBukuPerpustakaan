import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Book } from '../types';

type BukuItemNavigationProp = StackNavigationProp<RootStackParamList, 'BukuItem'>;

interface BukuItemProps {
    navigation: BukuItemNavigationProp;
}

const apiUrl = 'https://671af662acf9aa94f6ac293f.mockapi.io/books';

export default function BukuItem({ navigation }: BukuItemProps) {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchBooks = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<Book[]>(apiUrl);
            setBooks(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch books');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const deleteBook = async (id: string) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            Alert.alert('Success', 'Book deleted successfully');
            fetchBooks();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete book');
        }
    };

    return (
        <View style={styles.container}>
            <Button
                title="Tambah Buku"
                onPress={() => navigation.navigate('TambahBuku')}
            />
            <FlatList
                data={books}
                keyExtractor={item => item.id}
                refreshing={isLoading}
                onRefresh={fetchBooks}
                renderItem={({ item }) => (
                    <View style={styles.bookItem}>
                        <Image source={{ uri: item.coverBuku }} style={styles.cover} />
                        <Text>Judul buku: {item.judulBuku}</Text>
                        <Text>Penulis: {item.penulis}</Text>
                        <Text>Penerbit: {item.penerbit}</Text>
                        <Text>Genre: {item.genre}</Text>
                        <Text>Tahun Terbit: {item.tahunTerbit}</Text>
                        <Button
                            title="Edit"
                            onPress={() => navigation.navigate('EditBuku', { bookId: item.id })}
                        />
                        <Button
                            title="Hapus"
                            color="red"
                            onPress={() => {
                                Alert.alert(
                                    'Konfirmasi',
                                    'Apakah Anda yakin ingin menghapus buku ini?',
                                    [
                                        { text: 'Batal', style: 'cancel' },
                                        { text: 'Hapus', onPress: () => deleteBook(item.id) },
                                    ],
                                );
                            }}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    bookItem: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
    },
    cover: { width: 100, height: 150, marginBottom: 10, resizeMode: 'cover' },
});
