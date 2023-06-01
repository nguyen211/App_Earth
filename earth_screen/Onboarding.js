import { TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import React, { useEffect, } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding({ navigation }) {
  const getData = () => {
    AsyncStorage.getItem('@userID').then(id => {
        if (id != null) { navigation.navigate('HomeScreen'); }
    });
    AsyncStorage.getItem('@token').then(tk => {
        if (tk != null) { navigation.navigate('HomeScreen'); }
    });
}

useEffect(() => {
    getData();
},[]);


  return (
    <SafeAreaView style={{ flex: 0.7, justifyContent: 'center' }}>
      <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ fontSize: 30 }}>Hello friends</Text>
        <Text style={{ fontSize: 50 }}>Welcome to <Text style={{ backgroundColor: '#dc3545', color: 'white', borderRadius: 5 }}>Earth</Text></Text>
        <Text style={{ fontSize: 20 }}>Social network</Text>
      </View>
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-around', }}>
        <TouchableOpacity style={{ width: '35%', elevation: 8, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#dc3545', }} onPress={() => navigation.navigate('Login')}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: "bold", alignSelf: 'center' }}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '35%', elevation: 8, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#dc3545' }} onPress={() => navigation.navigate('Register')}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: "bold", alignSelf: 'center' }} >Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

