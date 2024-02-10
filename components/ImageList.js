import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

const ImageList = ({ imageList }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  };

  return (
    <FlatList
      data={imageList}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      // Optional: if your images are in a grid
      numColumns={3} // Adjust number of columns as needed
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 1, // Adjust spacing as needed
    // Optional: if your images are in a grid
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150, // Adjust size as needed
    height: 150, // Adjust size as needed
    resizeMode: 'cover', // Adjust resizeMode as needed
  },
});

export default ImageList;
