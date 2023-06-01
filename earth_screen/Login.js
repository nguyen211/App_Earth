import React, { useState, } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Login({ navigation }) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const getLogin = () => {
        if (user == '' || pass == '') {
            Alert.alert('Thông báo', 'Tài khoản hoặc mật khẩu không được bỏ trống !!!');
        }
        else {
            fetch('http://116.108.44.227/Login?email=' + user + "&pass=" + pass, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
                .then((res) => res.json())
                .then((resJson) => { storeData(resJson.userId, resJson.refreshToken); setUser(''); setPass(''); navigation.navigate('HomeScreen'); })
                .catch(() => { setPass(''); Alert.alert('Thông báo', 'Sai tài khoản hoặc mật khẩu !!!'); })
        }
    };

    const storeData = async (id, token) => {
        try {
            await AsyncStorage.setItem('@userID', id);
            await AsyncStorage.setItem('@token', token);
        } catch (e) { }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <SafeAreaView style={{ marginLeft: 20, marginRight: 20 }} onTouchStart={Keyboard.dismiss}>
                <Ionicons name="arrow-back" size={40} color="black" onPress={() => navigation.navigate('Onboarding')} />
                <Text style={{ marginTop: 50, fontSize: 30, textAlign: 'center', color: '#dc3545', fontWeight: 'bold', }}>Đăng nhập</Text>
                <View style={{ marginTop: '20%', }}>
                    <Text style={{ fontSize: 20, paddingTop: 20, paddingBottom: 7 }}>Tài khoản</Text>
                    <TextInput style={{ fontSize: 20, borderColor: '#dee2e6', borderWidth: 1, borderRadius: 5, paddingVertical: 12, paddingHorizontal: 12 }} value={user} onChangeText={(text) => setUser(text)}></TextInput>
                    <Text style={{ fontSize: 20, paddingTop: 20, paddingBottom: 7 }}>Mật khẩu</Text>
                    <TextInput secureTextEntry={true} style={{ fontSize: 20, borderColor: '#dee2e6', borderWidth: 1, borderRadius: 5, paddingVertical: 12, paddingHorizontal: 12 }} value={pass} onChangeText={(text) => setPass(text)}></TextInput>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '30%', marginBottom: 20 }}>
                    <TouchableOpacity style={{ width: '100%', elevation: 8, borderRadius: 10, paddingVertical: 15, paddingHorizontal: 12, backgroundColor: '#dc3545', }} onPress={getLogin}>
                        <Text style={{ fontSize: 25, color: 'white', fontWeight: "bold", alignSelf: 'center' }}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 20, paddingTop: 20 }}>Chưa có tài khoản? <Text style={{ color: 'blue', textDecorationLine: "underline" }} onPress={() => navigation.navigate('Register')}>Đăng ký ngay</Text></Text>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}