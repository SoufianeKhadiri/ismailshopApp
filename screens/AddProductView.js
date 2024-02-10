import {Alert, FlatList, ScrollView, TextInput, TouchableOpacity, View, Text, Image, StyleSheet, ImageBackground, Button } from 'react-native'
import React, { useState } from 'react'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import downloadURL from '../api/uploadImageToFirebase ';
import axios from 'axios';
import uploadImageToFirebase from '../api/uploadImageToFirebase ';


export default function AddProductView() {
    const navigation = useNavigation();
    
    var createdToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUB0ZXN0LmNvbSIsImNyZWF0ZWQiOjE3MDcwNjI3NzAzOTEsImV4cCI6MTcwNzY2NzU3MH0.HTUTSelLNEUBrtU3Gakf7hP35LcRiIG5fcW5wio7bBXfXg8G-XZ0UjzNbA9idikz-knoP1U9674GUleYzaF-HQ";
    let [images, setImages] = useState([]);
    let [image, setImage] = useState('https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/33533fe2-1157-4001-896e-1803b30659c8/air-force-1-07-herrenschuh-HvZlfx.png');
    let [imagesLinks, setImagesLinks] = useState([]);
    const [productName, setProductName] = useState('');
      const [productDescription, setProductDescription] = useState('');
      const [price, setPrice] = useState('');
      const [size, setSize] = useState('');
      const [category, setCategory] = useState('');
      const [brand, setBrand] = useState('');
      
      const showMessage = (msg) => {
        Alert.alert(
          'Message Title',
          msg,
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          { cancelable: false }
        );
      };
      
      const addImageLink = (picUrl) => {
        setImagesLinks(currentPics => [...currentPics, picUrl]);
      };


        const imageList = [
          { uri: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/33533fe2-1157-4001-896e-1803b30659c8/air-force-1-07-herrenschuh-HvZlfx.png' },
          { uri: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/33533fe2-1157-4001-896e-1803b30659c8/air-force-1-07-herrenschuh-HvZlfx.png' },
          { uri: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/33533fe2-1157-4001-896e-1803b30659c8/air-force-1-07-herrenschuh-HvZlfx.png' },
          { uri: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/33533fe2-1157-4001-896e-1803b30659c8/air-force-1-07-herrenschuh-HvZlfx.png' },
          { uri: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/33533fe2-1157-4001-896e-1803b30659c8/air-force-1-07-herrenschuh-HvZlfx.png' },
          { uri: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/33533fe2-1157-4001-896e-1803b30659c8/air-force-1-07-herrenschuh-HvZlfx.png' },
          // more images
        ];
     
      

const openCamera =  () => {
      const options = {
        saveToPhotos: true,
        mediaType: 'photo',
        includesBase64: false,
      };
    
     launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response.assets[0].uri;
        setImages((prevImages) => [... prevImages,source]);
        setImage(source);
        
      }
    });
    };
    
const openImageLibrary = () => {
      const options = {
        mediaType: 'photo',
        quality: 0.5,
        
      };
    
      launchImageLibrary(options, async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = response.assets[0].uri;
          
          setImages((prevImages) => [... prevImages,source]);
          setImage(source);
         
        }
      });
    };

// const uploadImagesToFirebase = async () =>{
//   const links = [];
//   setImagesLinks([])
  
//   for( let imageUri of images){
//     const Fotolink = await uploadImageToFirebase(imageUri);
//     links.push(Fotolink);

//   }
//   setImagesLinks(currentLinks => [...currentLinks, ...links]);
//   console.log(imagesLinks)
// }
  

const uploadImagesToFirebase = async () => {
  const promises = images.map(imageUri => uploadImageToFirebase(imageUri));
  const links = await Promise.all(promises);

  // This line will only execute after all promises in the `promises` array have been resolved
  // setImagesLinks(currentLinks => [...currentLinks, ...links]);
  return links; // Note: Logging `links` directly since `imagesLinks` may not reflect the updated state immediately
}

const insertProduct = async (productData) => {

        
        try {
          const response = await axios.post('https://ismailshop-backend.onrender.com/rest/api/tshirts', productData, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + createdToken
            },
            
          });
          console.log('Product Inserted:', response.data);
          // Handle success (e.g., show a success message or navigate to another screen)
        } catch (error) {
          console.error('Error inserting product:', error);
          // Handle error (e.g., show an error message)
        }
      };
    
const handleAddProduct = async () => {
    if(images.length>0){
         const links =  await uploadImagesToFirebase();
        console.log('Product Added:', { productName, productDescription, price, size, category, brand , pics: links  });
        const productData = { 
            name : productName,
            brand: brand,
            price: price,
            category: category,
            size : size, 
            fotos: links,
            description : productDescription,
           
        }
        if(links.length > 0){
          insertProduct(productData)
          // Reset form fields
          setProductName('');
          setProductDescription('');
          setPrice('');
          setSize(0);
          setCategory(0);
          setBrand('');
          setImages([]);
          setImagesLinks([]);

          showMessage("yes")

          }else{
            console.log("ja3bou9, chi mouchkil tema ")
          }
        
         }else{
          showMessage("ja3bou9 sawar l3ayba dialk!")
         }

        
      };

const handleImagePress = (uri) => {
   setImage(uri);
      };

  const handleDeleteImage = (img) => {
    images = images.filter(uri => uri !== img);
    setImages(images)
    setImage(images[images.length - 1])
  }

  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container} >
       <View style={{flexDirection:'row' , marginTop:10 }}>
       <Text style={styles.title}>Add a New Product</Text>
       
       <TouchableOpacity 
                   onPress={() => navigation.openDrawer()}>
                <Image 
                    source={require('../assets/menu.png')} 
                    style={styles.icon}
                />
        </TouchableOpacity>
    </View>
    { images.length > 0 &&
    <View style={styles.container}>
      <Image source={{ uri: image}} style={styles.image}/>
      <TouchableOpacity  style={styles.absoluteImage}
                       onPress={()=> handleDeleteImage(image)}  >
      <Image source={require('../assets/delete.png')} style={{height:30 , width:30 , flex:1 , justifyContent:'flex-end'}}  />
     </TouchableOpacity> 
    </View>}
    
     
     <FlatList 
      horizontal={true}
      data={images}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleImagePress(item)}>
        <Image 
          source={{uri : item}} // Correctly using the item as the source
          style={{ width: 100, height: 100 , margin:5 }}
        />
        </TouchableOpacity>
      )
  
      }
      >

      </FlatList>
     <View style={styles.StackContainer}>
       <TouchableOpacity style={styles.button} onPress={openCamera}>
         <Text style={styles.buttonText}>take foto</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={openImageLibrary}>
        <Text style={styles.buttonText}>galerie</Text>
       </TouchableOpacity>
     </View>

     <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />

      <RNPickerSelect
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle ={false}
        onValueChange={(value) => setCategory(value)}
        placeholder={{ label: 'Select a category' , value: 0}}
        items={[
          { label: 'Tshirts', value: 'Tshirts' },
          { label: 'Pantalons', value: 'Pantalons' },
          { label: 'Espadrilles', value: 'Espadrilles' },
         
        ]}
        value={category}
        
        />

      <RNPickerSelect 
        style={pickerSelectStyles}
        onValueChange={(value) => setSize(value)}
        placeholder={{
          label: 'Select a size',
          value: 0
        }}
        useNativeAndroidPickerStyle={false}
        
        items={[
          { label: 'XS', value: 'XS' },
          { label: 'S', value: 'XS' },
          { label: 'M', value: 'XS' },
          { label: 'L', value: 'XS' },
          { label: 'XL', value: 'XS' },
          { label: 'XXL', value: 'XS' },
        ]}
        value={size}
        
        />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

    <TextInput
        style={styles.input}
        placeholder="Brand"
        value={brand}
        onChangeText={setBrand}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        value={productDescription}
        onChangeText={setProductDescription}
      />

    <TouchableOpacity style={styles.AddButton} onPress={handleAddProduct}>
      <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity> 
    <Button title='test' onPress={()=> showMessage("test")}>

    </Button>
    
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  absoluteImage: {

    position: 'absolute',
    top: 10,
    left: 310,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
   
    width:30,
    height:30,
  },
    scrollView: {
        flex: 1,
      },
    container: {
      flex: 1,
      
      paddingLeft: 10,
      paddingRight:10,
      backgroundColor: '#fff',
      
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      marginLeft:10,
    },
    input: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 8,
      marginTop:10,
    },
    button: {
      backgroundColor: '#0B60B0',
      width:120,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginLeft:10,
      elevation: 2, // for Android shadow
    },
    AddButton: {
        backgroundColor: '#0B60B0',
        width:'auto',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        
        elevation: 2, // for Android shadow
      },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    image: {
      width: 300,
      height: 300, 
      alignSelf: 'center',
      
    },
    icon: {
        marginTop:0,
        marginRight:10,
        width: 30,
        height: 30,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    },
    StackContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignSelf: 'center', 
      },
  });

  const pickerSelectStyles = StyleSheet.create({


    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      marginBottom:10,
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    placeholder: {
      color: 'gray',
    },
    iconContainer: {
      top: 5,
      right: 15,
    },
  
  
  
  })