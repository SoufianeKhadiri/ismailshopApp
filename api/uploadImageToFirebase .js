import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';

const uploadImageToFirebase = async (uri) => {
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  const storageRef = storage().ref(`photos/${filename}`);

  try {
    const response = await fetch(uploadUri);
    const blob = await response.blob();

    const task = storageRef.put(blob);

    // Set up progress tracking
    task.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    });

    await task;

    // Get the download URL
    const downloadURL = await storageRef.getDownloadURL();
    //console.log('File available at', downloadURL);
    return downloadURL;
  } catch (e) {
    console.error(e);
  }
};

export default uploadImageToFirebase;
