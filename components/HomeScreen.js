import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from './config';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]); 
  const navigation = useNavigation();
 //peticion a la api para obtener el top de canciones por pais
  useEffect(() => {
    fetch(`http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=Mexico&api_key=${config.apiKey}&format=json`)
      .then((response) => response.json())
      .then((data) => {
        setTopSongs(data.tracks.track);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
 //funcion para mandar los datos de las canciones
  const handlePlayPress = (song) => {
    const { name, artist } = song;
  
    const imagen = Array.isArray(song.image) && song.image.length > 0
      ? song.image.find(image => image.size === "small")['#text']
      : null;
  
   
    const songData = {
      name: name,
      artist: artist,
      selectedImage: imagen, 
    };
  
    navigation.navigate('Reproductor', {
      selectedSong: name,
      selectedArtist: artist.name,
      selectedImage: imagen, 
    });
  
    setSelectedSongs([...selectedSongs, songData]);
  };
 //Función para renderizar elementos individuales en la lista de canciones*
  const renderItem = ({ item }) => {
    if (Array.isArray(item.image) && item.image.length > 0) {
      const imagen= item.image.find(image => image.size === "small")['#text'];

      if (imagen) {
        return (
          <TouchableOpacity
            style={styles.cont}
            onPress={() => handlePlayPress(item)}
          >
            <View style={styles.imagen}>
              <Image
                source={{ uri: imagen }}
                style={{ width: 80, height: 80 }}
              />
            </View>
            <View style={styles.songItem}>
              <Text style={styles.songName}>{item.name}</Text>
              <Text style={styles.artistName}>{item.artist.name}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    }

    return (
      <TouchableOpacity
        style={styles.songItem}
        onPress={() => handlePlayPress(item)}
      >
        <Text style={styles.songName}>{item.name}</Text>
        <Text style={styles.artistName}>{item.artist.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
<TouchableOpacity onPress={() => navigation.navigate('MiPerfil', { selectedSongs })} style={styles.profileButton}>
  <FontAwesome name="user-circle" size={40} color="white" />
</TouchableOpacity>

      <Text style={styles.heading}>Canciones TOP por país</Text>
      <FlatList
        data={topSongs}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
};
// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(22 34 56)",
  },
  cont: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 10,
    height: 100
  },
  heading: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  songItem: {
    width: "100%",
    marginLeft: 10,
  },
  songName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  artistName: {
    fontSize: 19,
    color: 'gray',
  },
  imagen: {
    marginLeft: 10,
  },
  profileButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  profileButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeScreen;
