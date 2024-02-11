import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';


const uploadImageToFirebase = async (imageName, uri) => {
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  
  const storageRef = storage().ref(imageName);
       await storageRef.putFile(uploadUri)
                  .then((snapshot) => {
                    
                    console.log(`${imageName} has been successfully uploaded.`);
                  })
                  .catch((e) => console.log('uploading image error => ', e));
  
  try {
    const downloadURL = await storageRef.getDownloadURL();
    return downloadURL;
  } catch (e) {
    console.error(e);
  }
 
};

export default uploadImageToFirebase;
