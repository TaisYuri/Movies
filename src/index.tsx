import React, { useCallback, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import api from "../services/api";
import {useNavigation} from '@react-navigation/native';

export function Teste() {
  const [user, setUser] = useState([]);
  const [codFilms, setCodFilms] = useState([]);
  const [listTopMovies, setListTopMovies] = useState([]);

  const renderApi = useCallback(async() => {
    await api
      .get("/changes?api_key=856d12c0c4ce7988a3a8486fc485fad4&page=1")
      .then((response) => setUser(response.data.results))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  },[])

  const ArrayFilms = useCallback( ()=> {
    const array = user.slice(0, 5);
    array.map((item) => {
      setCodFilms((oldArray): any => [...oldArray, item.id]);
    });
  },[])

  const listAttFilmes = useCallback( ()=> {
    codFilms.map(
      async (item) =>{         
        await api
          .get(
            `/${item}?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US`
          )
          .then((response) => {
            setListTopMovies((oldData): any => [...oldData, response.data]);
          })

          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          })}
    );

  },[])

  useEffect(() => {     

    renderApi();
    ArrayFilms();    
    console.log('codFilms', codFilms)

    listAttFilmes();
    console.log('listTopMovies', listTopMovies)


  }, []);

  // function listFilms () {
  //   if (user !== [] || user !== undefined) {
  //     console.log('teste', JSON.stringify(codFilms, null, 2))
  //     codFilms.map(
  //       async (item) =>{         
  //         await api
  //           .get(
  //             `/${item}?api_key=856d12c0c4ce7988a3a8486fc485fad4&language=en-US`
  //           )
  //           .then((response) => {
  //             setListTopMovies((oldData): any => [...oldData, response.data]);
  //           })

  //           .catch((err) => {
  //             console.error("ops! ocorreu um erro" + err);
  //           })}
  //     );
  //   }
  // }

  console.log('Filmes', listTopMovies)

  return (
    <View>
      {listTopMovies.map( item => 
        <View key={`${item.backdrop_path}+${id}`} >
          <Text style={{marginHorizontal: 25, fontSize: 12}} >`\n`{item.original_title}</Text>
          <Text style={{marginHorizontal: 25, fontSize: 12}} >` - {item.original_language}</Text>
          <Text style={{marginHorizontal: 25, fontSize: 12}} >` - {item.genres.name}</Text>
        </View>)}
      {/* <Button title="aaaacaaasd" onPress={() => listFilms()} /> */}
    </View>
  );
}
