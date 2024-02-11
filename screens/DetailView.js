// DetailView.js
import React from 'react';
import { ScrollView, Linking ,View, TouchableOpacity, Image, Text, StyleSheet ,Dimensions, Button  } from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { getStorage, ref, deleteObject } from "firebase/storage";
import firebase from 'firebase/compat/app';
import storage from '@react-native-firebase/storage';


import { useNavigation } from '@react-navigation/native';

const DetailView = ({ route }) => {

    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window');
    var createdToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUB0ZXN0LmNvbSIsImNyZWF0ZWQiOjE3MDc2Nzc2MjgzMjUsImV4cCI6MTcwODI4MjQyOH0.gwmKfDalzhk_amCpjXWbnSRUrZROazHZxH2MyIg9l3WY6VfXmesARqSQAau9ccqYgQnegeqOGXAg1twKR-BXag";
    
    const item  = route.params.tshirt;

    const deleteProductFromApi = async () => {     
      try {
        const response = await axios.delete('https://ismailshop-backend.onrender.com/rest/api/tshirts/'+ item.uid, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + createdToken
          },
          
        });
        console.log('Product deleted:', response.data);
       
      } catch (error) {
        console.error('Error deleted product:', error);
       
      }
    };
    
   
    const deleteItem =  async () => {
       await deleteImageFromStorage();
       await deleteProductFromApi();
      navigation.navigate('HomeScreen');
       
                    
    };

    const deleteImageFromStorage = async () => {

      for (let index = 0; index < item.fotos.length ; index++) {
        
        let imageRef = storage().ref('/' + item.name + index);
        imageRef
       .delete()
       .then(() => {
         console.log(`${item.name}has been deleted successfully.`);
       })
       .catch((e) => console.log('error on image deletion => ', e));


      }  
    };

    // Accepts an array of image URIs as a prop
    const ImageSlider = ({images}) => {
      
      return (
        <View style={styles.wrapper}>
          <Swiper showsButtons={true} autoplay={false} >
            {images.map((uri, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{uri}} style={{width: width, height: 440, resizeMode: 'cover' , marginLeft:-10 , marginRight:-10 } } />
              </View>
            ))}
          </Swiper>
        </View>
      );
    };

    const initiateWhatsApp = () => {
      
      let url =
        'whatsapp://send?text=' + 
         item.name + ","+ item.price+
        '&phone=43' + '67762406056';
      Linking.openURL(url)
        .then((data) => {
          console.log('WhatsApp Opened');
        })
        .catch(() => {
          alert('Make sure Whatsapp installed on your device');
        });
    };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.LogoContainer}>
            <TouchableOpacity style={styles.LogoButton} onPress={() => navigation.navigate('HomeScreen')}>
              <Image 
                source={require('../assets/logo.png')} 
                style={styles.LogoImage}
              />
            
            </TouchableOpacity>
        </View>
      
       <Text style={styles.titel}>{item.name}</Text> 
       <Text style={styles.brand}>{item.brand}</Text> 
       <Text style={styles.size}>Taille: {item.size}</Text>
       <Text style={styles.price}>{item.price} Dh</Text> 
       <ImageSlider images={item.fotos} />
       <Text style={styles.description}>{item.description} </Text> 
       <TouchableOpacity onPress={initiateWhatsApp}>
       <Image 
              source={require('../assets/whatsapp.png')} 
                    style={styles.Whatsapp}
                />
       </TouchableOpacity>
       <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center'}}>
       <TouchableOpacity onPress={deleteItem} style={styles.button} >
          <Text style={{color:'red' , fontSize:20 , fontWeight:'bold'}}>DELETE</Text>
       </TouchableOpacity>
       </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
    backgroundColor:'white',
  },
  
  titel: {
    fontSize: 25,
    fontWeight:'450',
    marginTop: 10,
    color: 'black',
  },
  
  brand: {
    fontSize: 18,
    fontWeight:'450',
    marginTop: 0,
    color: 'black',
  },
  size: {
    fontSize: 20,
    fontWeight:'450',
    marginTop: 0,
    color: 'black',
    marginTop:5,
  },
  price: {
    fontSize: 25,
    fontWeight:'bold',
    marginLeft:5,
    color: 'black',
    marginTop:15,
    
  },
  description: {
    marginTop:20,
    marginLeft:5,
    fontSize: 20,
    
  },
 
  logo: {
    flex: 1,
    marginTop:5,
   
    width: 60,
    height: 60,
    alignItems: 'flex-end', 
    justifyContent: 'flex-end',

},

LogoContainer: {
  
  flex: 1,
  alignItems: 'flex-end', 
 
  
},
LogoButton: {
  marginBottom: -20,
  width: 60,
  height: 60,
  
  justifyContent: 'center', 
  alignItems: 'center', 
},
LogoImage: {
  
  width: '100%', 
  height: '100%', 
  resizeMode: 'contain',
},

Whatsapp: {
  marginTop:15,
  marginLeft:-10,
  width: 150,
  height: 50,
  resizeMode: 'contain',
},
wrapper: {
  height: 440, 
  marginLeft:-10 , 
  marginRight:-10,
  marginTop:10,
},
slide: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
button: {
  marginTop:10,
  width: 200, 
  borderWidth: 1,
  borderColor: 'red',
  padding: 10,
  borderRadius: 5,
  backgroundColor: 'white',
  alignItems: 'center', 
},

});

export default DetailView;
