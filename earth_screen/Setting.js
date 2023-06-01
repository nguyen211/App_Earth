import React, { useState, useEffect, } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Setting({ navigation }) {
    const [userID, setUser] = useState('');
    const [token, setToken] = useState('');
    const baseUrl = 'http://116.108.44.227/';
    const [data, setData] = useState([]);

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
        fetch(baseUrl + 'Account/IsMe/' + userID, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((resJson) => { setData(resJson);})
            .catch((error) => { })
    }

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('@userID');
            await AsyncStorage.removeItem('@token');
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ flex: 1 }} >
            <SafeAreaView style={{ flexDirection: 'row', }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#dc3545', paddingBottom: 10, paddingLeft: 10 }}>Cài đặt</Text>
            </SafeAreaView>
            <TouchableOpacity style={{ backgroundColor: '#fff', margin: 10, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }} onPress={() => navigation.navigate('Acc', { userId: data.userId })}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 65, height: 65, borderRadius: 50 }} resizeMode="cover" source={{ uri: data.avatar }}></Image>
                    <Text style={{ fontSize: 25, fontWeight: '700', marginLeft: 10 }}>{data.fullName}</Text>
                </View>
                <Ionicons name="settings-outline" size={40} color={'#ea4335'} />
            </TouchableOpacity>

            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>Tất cả lối tắt</Text>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <TouchableOpacity style={{ backgroundColor: '#fff', padding: 10, width: '48.5%', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }} onPress={() => navigation.navigate('FirendScreen')}>
                            <Ionicons name="people-outline" size={40} color={'#ea4335'} />
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>Bạn bè</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#fff', padding: 10, width: '48.5%', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }} onPress={() => navigation.navigate('MessScreen')}>
                            <Ionicons name="chatbubbles-outline" size={40} color={'#ea4335'} />
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>Nhắn tin</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ backgroundColor: '#fff', padding: 10, width: '48.5%', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                            <Ionicons name="game-controller-outline" size={40} color={'#ea4335'} />
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>Trò chơi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#fff', padding: 10, width: '48.5%', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }} onPress={() => navigation.navigate('Group')}>
                            <Ionicons name="earth" size={40} color={'#ea4335'} />
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>Nhóm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ margin: 10 }}>
                <View style={{ backgroundColor: '#ccc', paddingBottom: 2 }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="ribbon-outline" size={40} color={'#ea4335'} />
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Thông tin về Dev</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={40} color={'#ea4335'} />
                </TouchableOpacity>
                <View style={{ backgroundColor: '#ccc', paddingBottom: 2 }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="help-circle-outline" size={40} color={'#ea4335'} />
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Trợ giúp & hỗ trợ</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={40} color={'#ea4335'} />
                </TouchableOpacity>
                <View style={{ backgroundColor: '#ccc', paddingBottom: 2 }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="menu" size={40} color={'#ea4335'} />
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Cài đặt & quyền riêng tư</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ backgroundColor: '#dc3545', margin: 10, padding: 10, alignItems: 'center', borderRadius: 10 }} onPress={logOut}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff' }}>Đăng xuất</Text>
            </TouchableOpacity>

        </View>
    )
}