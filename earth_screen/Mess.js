import React, { useState, useEffect, } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Image, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [userID, setUser] = useState('');
    const [token, setToken] = useState('');
    const baseUrl = 'http://116.108.44.227/';
    const [friend, setFriend] = useState([]);
    const [list, setList] = useState([]);

    //list friend
    useEffect(() => {
        getData();
        api();
    }, [userID, token]);

    const getData = () => {
        try {
            AsyncStorage.getItem('@userID').then(id => {
                if (id != null) { setUser(id); }
            });
            AsyncStorage.getItem('@token').then(tk => {
                if (tk != null) { setToken(tk); }
            });

        } catch (error) {
            console.log(error);
        }
    }

    const api = () => {
        this.interval = setInterval(() => {
            const api = baseUrl + 'Account/MyFriend/' + userID;
            fetch(api, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
                .then((res) => res.json())
                .then((resJson) => { setFriend(resJson); })
                .catch(() => { })
        }, 500);
        fetch(baseUrl + 'Account/ListChat/' + userID, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((resJson) => { setList(resJson); })
            .catch(() => { })
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#dc3545', paddingBottom: 10, paddingLeft: 10 }}>Tin nhắn</Text>
            </SafeAreaView>
            {/* danh sach ban be */}
            <View style={{ backgroundColor: '#fff', margin: 7, padding: 7, borderRadius: 5 }}>
                <Text style={{ fontSize: 20, marginBottom: 7 }}>Bạn bè</Text>
                <ScrollView horizontal={true}>
                    {friend.map((item, index) => {
                        return (
                            <View style={{ flexDirection: 'row' }} key={index}>
                                <TouchableOpacity style={{ marginRight: 7, }} onPress={() => navigation.navigate('Chat', { fromUser: userID, userId: item.userId, online: item.status, name: item.fullName, ava: item.avatar })}>
                                    <Image style={{ width: 55, height: 55, borderRadius: 30 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                                    {item.status == false ? undefined : <Ionicons style={{ position: "absolute", left: '67%', top: '67%' }} name="ellipse-sharp" size={19} color={'#00cc00'} />}
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>

            {/* danh sach chat */}
            <View style={{flex:1, backgroundColor: '#fff', margin: 7, padding: 7, borderRadius: 5 }}>
                <Text style={{ fontSize: 20, marginBottom: 7 }}>Đoạn chat</Text>
                <ScrollView>
                    {list.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ccc',marginBottom:7,padding:7, borderRadius: 10 }} onPress={() => navigation.navigate('Chat', { fromUser: userID, userId: item.toUser, online: item.status, name: item.fullName, ava: item.avatar })}>
                                <Image style={{ width: 55, height: 55, borderRadius: 30 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                                {item.status == false ? undefined : <Ionicons style={{ marginLeft:7}} name="ellipse-sharp" size={19} color={'#00cc00'} />}
                                {item.status == true ? undefined : <Ionicons style={{ marginLeft:7}} name="ellipse-sharp" size={19} color={'#ff3300'} />}
                                <Text style={{ fontSize: 20,marginLeft:7}}>{item.fullName}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}