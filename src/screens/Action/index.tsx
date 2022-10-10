import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";

import {useNavigation} from '@react-navigation/native';
import api from "../../../services/api";

export function Action() {
  const [user, setUser] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {     
   async function renderApi() {
      await api
        .get("/changes?api_key=856d12c0c4ce7988a3a8486fc485fad4&page=1")
        .then((response) => {setUser((response.data.results).slice(0,30))})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
      }
    renderApi();

     
  }, []);


  return (
    <View>
      {/* {listTopMovies.map( item => 
        <View key={`${item.backdrop_path}+${id}`} >
          <Text style={{marginHorizontal: 25, fontSize: 12}} >`\n`{item.original_title}</Text>
          <Text style={{marginHorizontal: 25, fontSize: 12}} >` - {item.original_language}</Text>
          <Text style={{marginHorizontal: 25, fontSize: 12}} >` - {item.genres.name}</Text>
        </View>)} */}
      <Button title="aaaacaaasd" onPress={() => {navigation.navigate('List', {user}),  console.log('PAGE HOME, USER', user)}} />
    </View>
  );
}
