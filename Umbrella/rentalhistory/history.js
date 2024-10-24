import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {init, fetchAllRENT} from './rentalhistory/db';

init()
.then(()=>{
    console.log('Database creation succeeded!');
}).catch((err)=>{
  console.log('Database IS NOT initialized! '+err);
});
export function history() {
async function readAllRENT(){
  try{
    const dbResult = await fetchAllRENT();
    console.log("dbResult readAllFish in App.js");
    console.log(dbResult);
    setRentList(dbResult);
  }
  catch(err){
    console.log("Error: "+err);
  }
  finally{
    console.log("All fish are red - really?");
  }
}

   const styles = StyleSheet.create({ 
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'top',
      justifyContent: 'center',
    }
 
  });
}



export default history;