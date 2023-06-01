import React, { useState, useEffect, } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Image, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

export default function Chat({ navigation: { goBack }, navigation }) {
    const route = useRoute();
    const baseUrl = 'http://116.108.44.227/';
    const [data, setData] = useState([]);
    const [show, setShow] = useState('');
    const fromUserId = route.params.fromUser;
    const toUserId = route.params.userId;

    useEffect(() => {
        this.interval = setInterval(() => {
            const api = baseUrl + 'Account/Chating?from=' + fromUserId + "&to=" + toUserId;
            fetch(api, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
                .then((res) => res.json())
                .then((resJson) => { setData(resJson); })
                .catch((error) => { console.log(error); })
        }, 500);
    }, []);

    _sendMess = () => {
        fetch(baseUrl + 'Account/SendMess', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fromUser: fromUserId,
            toUser: toUserId,
            message1: show,
          })
        });
        setShow('');
        Keyboard.dismiss();
    }

    back = () => {
        clearInterval(this.interval);
        goBack();
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff' }}>
                <TouchableOpacity onPress={back}>
                    <Ionicons name="chevron-back" size={35} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginLeft: 10, paddingBottom: 7 }}>
                    <Image style={{ width: 45, height: 45, borderRadius: 30 }} resizeMode="cover" source={{ uri: route.params.ava }}></Image>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Acc', { userId: toUserId })}>
                            <Text style={{ fontSize: 20, marginLeft: 5, }}>{route.params.name}</Text>
                        </TouchableOpacity>
                        {route.params.online == false ? <Text style={{ color: '#9a9a9a', marginLeft: 5, }}><Ionicons name="ellipse-sharp" size={15} color={'#ff3300'} /> Không hoạt động</Text> : <Text style={{ color: '#9a9a9a', marginLeft: 5, }}><Ionicons name="ellipse-sharp" size={15} color={'#00cc00'} /> Đang hoạt động</Text>}
                    </View>
                </View>
            </SafeAreaView>

            {/* Chat */}
            <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 7, marginHorizontal: 7, borderRadius: 5 }} onTouchStart={Keyboard.dismiss}>
                <ScrollView style={{ padding: 7 }} showsVerticalScrollIndicator={false} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
                        <Image style={{ width: 100, height: 100, borderRadius: 30 }} resizeMode="cover" source={{ uri: route.params.ava }}></Image>
                        {route.params.online == false ? <Ionicons style={{ position: 'absolute', bottom: '65%', left: '55%' }} name="ellipse-sharp" size={30} color={'#ff3300'} /> : <Ionicons style={{ position: 'absolute', bottom: '65%', left: '55%' }} name="ellipse-sharp" size={30} color={'#00cc00'} />}
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#dc3545' }}>{route.params.name}</Text>
                        <Text style={{ fontSize: 20, color: '#ccc' }}>Cư dân Trái Đất</Text>
                    </View>
                    {data.map((item, index) => {
                        return (
                            <View key={index}>
                                {item.fromUser == toUserId && item.toUser == fromUserId ?
                                    //incoming
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', }}>
                                        <Image style={{ width: 45, height: 45, }} resizeMode="cover" source={{ uri: item.fromAva }}></Image>
                                        <View style={{ backgroundColor: '#ffa0a0', margin: 5, borderTopEndRadius: 20, borderTopStartRadius: 20, borderBottomEndRadius: 20, }}>
                                            <Text style={{ fontSize: 23, padding: 10 }}>{item.message1}</Text>
                                        </View>
                                    </View> :
                                    // outgoing
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
                                        <View style={{ backgroundColor: '#ccedf2', margin: 5, borderTopEndRadius: 20, borderTopStartRadius: 20, borderBottomStartRadius: 20, }}>
                                            <Text style={{ fontSize: 23, padding: 10 }}>{item.message1}</Text>
                                        </View>
                                    </View>
                                }
                            </View>
                        )
                    })}
                </ScrollView>
            </View>

            {/* Texting */}
            <View style={{ flexDirection: "row", padding: 7, marginHorizontal: 7, marginTop: 7, backgroundColor: '#fff', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                <TouchableOpacity style={{ marginLeft: 5, justifyContent: "center", alignItems: 'center' }}>
                    <Ionicons name="happy-outline" size={35} color={'#dc3545'} />
                </TouchableOpacity>
                <TextInput placeholder="Nhắn tin..." style={{ fontSize: 20, marginHorizontal: 10, width: '75%', backgroundColor: '#f2f2f2', borderRadius: 5, padding: 12, }} value={show} onChangeText={(text) => setShow(text)}></TextInput>
                {show ? (
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: 'center' }} onPress={_sendMess}>
                        <Ionicons name="paper-plane" size={35} color={'#dc3545'} />
                    </TouchableOpacity>
                ) : null}
            </View>
        </KeyboardAvoidingView>
    )
}