import React from 'react';
import {  View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TShirtItem = ({ tshirt, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} >
            <Image source={{ uri: tshirt.fotos[0] }} style={styles.image} />
            <Text style={styles.name}>{tshirt.name}</Text>
            <Text style={styles.price}>{tshirt.price} Dh</Text>
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
        width: 170,
        height: 170,
        resizeMode: 'cover',
    },
    name: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: 'normal',
        color:'black'
    },
    price: {
        fontSize: 18,
        fontWeight:'bold',
        color: 'black',
    },
});

export default TShirtItem;
