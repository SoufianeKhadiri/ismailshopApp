
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import TShirtList from '../components/TShirtList';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { fetchTshitsData, user_login } from '../api/user_Api';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

  const navigation = useNavigation();
  var createdToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUB0ZXN0LmNvbSIsImNyZWF0ZWQiOjE3MDc2Nzc2MjgzMjUsImV4cCI6MTcwODI4MjQyOH0.gwmKfDalzhk_amCpjXWbnSRUrZROazHZxH2MyIg9l3WY6VfXmesARqSQAau9ccqYgQnegeqOGXAg1twKR-BXag";
  const [tshirts, setTshirts] = useState([]);


  async function loadData() {
    const request = await axios.get('https://ismailshop-backend.onrender.com/rest/api/tshirts', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + createdToken
      },
      
    });
    console.log(request.data);
    setTshirts(request.data)
    return request
  }


  
//   useEffect(() => {
    
//     loadData();
    
//     // user_login({
//     //   email:'test5@test.com',
//     //   password:'123456'
//     // }).then(result => {
//     //   createdToken =  result.data.token
//     //   console.log(createdToken);
//     //   // fetchData(createdToken);
     
//     // //   fetch('https://ismailshop-backend.onrender.com/rest/api/tshirts', {
//     // //   method: 'GET',
//     // //   headers: {
//     // //     Accept: 'application/json',
//     // //     'Content-Type': 'application/json',
//     // //     Authorization: 'Bearer ' + createdToken
//     // //   },
      
//     // // }).then(response => console.log(response.json()));
    
//     // }).catch(err => {
//     //   console.error(err);
//     // })

//     // const fetchData =  () => {
//     //   try {
//     //     const response =  fetch('https://ismailshop-backend.onrender.com/rest/api/tshirts', {
//     //       method: 'GET',
//     //       headers: {
//     //         Accept: 'application/json',
//     //         'Content-Type': 'application/json',
//     //           Authorization: 'Bearer ' + createdToken
//     //       },
          
//     //     });

//     //     if (!response.ok) {
//     //       throw new Error(`HTTP error! status: ${response.status}`);
//     //     }

//     //     const data =  response.json();
//     //     setTshirts(data);
       
//     //     console.log(data)
//     //   } catch (error) {
//     //     console.error('Error fetching data:', error);
//     //   }
//     // };

//     // if (createdToken) {
//     //   fetchData();
//     // }

//   //   var data = fetchData(createdToken)
//   //   console.log(data)
//   //   setTshirts(data)
//   // console.log(tshirts)

//   }, []); // Dependency array includes token, so useEffect runs when token changes


useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );      


  const handleTShirtPress = (tshirt) => {
     navigation.navigate('DetailView', { tshirt }) 
    // Handle T-shirt press here (e.g., navigate to details page)
    console.log('T-shirt pressed:', tshirt);
  };
  

  return (
    <View style={styles.container}>
       <NavBar />
       
        <TShirtList tshirts={tshirts} onTShirtPress={handleTShirtPress} 
                                       />
    </View>
);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
  },
});




// user_login({
//   email:'test5@test.com',
//   password:'123456'
// }).then(result => {
//   createdToken =  result.data.token
//   console.log(createdToken);
//   fetchData(createdToken);
 
// //   fetch('https://ismailshop-backend.onrender.com/rest/api/tshirts', {
// //   method: 'GET',
// //   headers: {
// //     Accept: 'application/json',
// //     'Content-Type': 'application/json',
// //     Authorization: 'Bearer ' + createdToken
// //   },
  
// // }).then(response => console.log(response.json()));

// }).catch(err => {
//   console.error(err);
// })




function fetchData(token) {
  return fetch('https://ismailshop-backend.onrender.com/rest/api/tshirts', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();

  }); 
}

// import { View, Text } from 'react-native'
// import React from 'react'

// export default function HomeScreen() {
//   return (
//     <View>
//       <Text>HomeScreen</Text>
//     </View>
//   )
// }