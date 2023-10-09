import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const Reproductor = ({ route, isPlayerMinimized }) => {
  const { selectedSong, selectedArtist, selectedImage } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true); 
  const navigation = useNavigation(); 

  useEffect(() => {
    
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 300);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);
// Función para los controles
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleSize = () => {
    if (!isPlayerMinimized) {
     
      console.log("ir a home");
      navigation.navigate('Home');
    }
    setIsExpanded(!isExpanded);
  };

  const playPreviousSong = () => {
  
  };

  const playNextSong = () => {

  };

  const progressBarWidth = (currentTime / TOTAL_DURATION) * PROGRESS_BAR_WIDTH;
//Renderización del reproductor
  return (
    <View style={isExpanded ? styles.repExpanded : styles.repMinimized}>
      {isExpanded ? (
        <TouchableOpacity onPress={toggleSize}>
          <Image
            source={{ uri: selectedImage }}
            style={styles.expandedImage}
          />
        </TouchableOpacity>
      ) : null}
      {isExpanded ? (
        <View>
          <Text style={styles.cancion}>{selectedSong}</Text>
          <Text style={styles.artista}> {selectedArtist}</Text>
        </View>
      ) : null}

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={playPreviousSong}>
          <FontAwesome name="step-backward" size={34} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={togglePlayback}>
          <FontAwesome name={isPlaying ? 'pause' : 'play'} size={34} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={playNextSong}>
          <FontAwesome name="step-forward" size={34} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={toggleSize}>
          <FontAwesome name={isExpanded ? 'chevron-down' : 'chevron-up'} size={34} color="white" />
        </TouchableOpacity>
      </View>

      {isExpanded ? (
        <View style={styles.progressBar}>
          <View style={{ width: progressBarWidth, height: 10, backgroundColor: 'blue' }} />
          <View style={{ width: PROGRESS_BAR_WIDTH - progressBarWidth, height: 10, backgroundColor: 'white' }} />
        </View>
      ) : null}
    </View>
  );
};

const TOTAL_DURATION = 300;
const PROGRESS_BAR_WIDTH = 250;
//estilos
const styles = StyleSheet.create({
  repExpanded: {
    backgroundColor: "rgb(22 34 56)",
    height:"100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  repMinimized: {
    
    position: 'absolute',
    bottom: 0,
    marginBottom: 40,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  expandedImage: {
    
    width: 300,
    
    height: 300,
    borderRadius: 50,
  },
  cancion: {
    color:"white",
    fontSize: 30,
    fontWeight: 'bold',
  },
  artista: {
    color:"white",
    fontSize: 15,
  },
  controls: {
    
    top: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    
    marginHorizontal: 20,
  },
  progressBar: {
    flexDirection: 'row',
    bottom: 30,
    width: PROGRESS_BAR_WIDTH,
  },
});

export default Reproductor;
