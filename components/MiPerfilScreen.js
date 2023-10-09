import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const MiPerfilScreen = ({ route }) => {
  const { selectedSongs } = route.params;

  // Utiliza un Set para almacenar las canciones únicas
  const uniqueSongs = new Set();

  // Filtra las canciones duplicadas 
  const filteredSelectedSongs = selectedSongs.filter((song) => {
    if (!uniqueSongs.has(song.name)) {
      uniqueSongs.add(song.name);
      return true;
    }
    return false;
  });
//Función para renderizar elementos
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mi Perfil</Text>
      <Text style={styles.heading}>Mis Reproducciones Únicas</Text>
      <FlatList
  data={filteredSelectedSongs}
  keyExtractor={(item) => item.name}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: item.selectedImage }} 
        style={styles.songImage}
      />
      <View style={styles.songDetails}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color:"white" }}>{item.name}</Text>
        <Text style={{  color:"white" }}>{item.artist.name}</Text>
      </View>
    </View>
  )}
/>

    </View>
  );
};
//estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(22 34 56)",
   
  },

  heading: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    color:"white"
  },
  item: {
    
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  songImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  songDetails: {
    flex: 1,
  },
});

export default MiPerfilScreen;
