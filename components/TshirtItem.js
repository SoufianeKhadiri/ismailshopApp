import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TShirtItem = ({ tshirt, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{ uri: tshirt.fotos[0] }} style={styles.image} />
            <Text style={styles.name}>{tshirt.name}</Text>
            <Text style={styles.price}>${tshirt.price}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    name: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
});

export default TShirtItem;
