import React from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';
import TShirtItem from './TshirtItem';

const TShirtList = ({ tshirts, onTShirtPress , onTShirtLongPress}) => {
    const renderTShirtItem = ({ item }) => (
        <TShirtItem 
            tshirt={item} 
            onPress={() => onTShirtPress(item)} 
           
        />
    );

    return (
        <FlatList
            data={tshirts}
            renderItem={renderTShirtItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    row: {
        flex: 1,
        justifyContent: 'space-around',
    },
});

export default TShirtList;
