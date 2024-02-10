// DetailView.js
import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet ,Dimensions  } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const DetailView = ({ route }) => {

    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window');

  const item  = route.params.tshirt;

  return (
    <View style={styles.container}>
        {/* back button */}
       <TouchableOpacity style={styles.accountButton}
                   onPress={() => navigation.goBack()}>
                <Image 
                    source={require('../assets/menu.png')} 
                    style={styles.icon}
                />
       </TouchableOpacity>
       <Text style={styles.titel}>{item.name}</Text> 
       <Text style={styles.brand}>{item.brand}</Text> 
       <Text style={styles.price}>{item.price} Dh</Text> 
       

      <Image  source={{uri:item.fotos[0]}}  style={{width: width ,height: height * 0.5, marginLeft:-10 , marginTop:10}}  />
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  
  titel: {
    fontSize: 33,
    fontWeight:'450',
    marginTop: 10,
    color: 'black',
  },
  
  brand: {
    fontSize: 23,
    fontWeight:'450',
    marginTop: 0,
    color: 'black',
  },
  price: {
    fontSize: 23,
    fontWeight:'bold',
    marginTop: 10,
    color: 'black',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
 
  icon: {
    marginTop:15,
    width: 30,
    height: 30,
    resizeMode: 'contain',
},
});

export default DetailView;
