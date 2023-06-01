import React, { useState, useEffect, } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Image, TextInput, Dimensions, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

export default function SinglePost({ navigation: { goBack } }) {
    const route = useRoute();
    const autoWidth = Dimensions.get("window").width;
    const baseUrl = 'http://116.108.44.227/';
    const [data, setData] = useState([]);
    const [cmt, setCmt] = useState([]);
    const [show, setShow] = useState('');
    const [isLoad, setisLoad] = useState(true);

    useEffect(() => {
        this.interval = setInterval(() => {
            const api = baseUrl + 'Newsfeed/DetaillPost/' + route.params.postId;
            fetch(api, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
                .then((res) => res.json())
                .then((resJson) => { setData(resJson); setCmt(resJson.comment);setisLoad(false); })
                .catch((error) => { console.log(error); })
        }, 1000);
    }, []);

    const _cmt = () => {
        fetch(baseUrl + 'Newsfeed/NewCmt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: route.params.postId,
                userId: route.params.userId,
                content: show
            })
        });
        setShow('');
        Keyboard.dismiss();
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            {isLoad ? <ActivityIndicator size={"large"} style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} /> : (

                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <SafeAreaView style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => goBack()}>
                            <Ionicons name="chevron-back" size={35} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <Image style={{ width: 45, height: 45, borderRadius: 30 }} resizeMode="cover" source={{ uri: data.avatar }}></Image>
                            <View>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 20, marginLeft: 5, }}>{data.fullName}</Text>
                                </TouchableOpacity>
                                <Text style={{ color: '#9a9a9a', marginLeft: 5, }}>{data.datepost} ' {data.accessModifier == 'Công khai' ? <Ionicons name="earth" size={20} /> : <Ionicons name="people" size={20} />}</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={{ fontSize: 22, marginHorizontal: 10 }}>{data.content}</Text>
                            <AutoHeightImage width={autoWidth} style={{ marginTop: 5, }} resizeMode="contain" source={{ uri: data.image1 }}></AutoHeightImage>
                            <View style={{ flexDirection: 'row', padding: 10, justifyContent: "space-between" }}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                                    <Ionicons name="heart-outline" size={30} color={'#dc3545'} />
                                    <Text style={{ fontSize: 20, }}> Tim</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginHorizontal: 40 }}>
                                    <Ionicons name="chatbox-ellipses-outline" size={30} />
                                    <Text style={{ fontSize: 20, }}> Bình luận</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                                    <Ionicons name="arrow-redo-outline" size={30} color={'blue'} />
                                    <Text style={{ fontSize: 20, }}>Chia sẻ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ paddingTop: 15, borderTopWidth: 1, marginHorizontal: 10 }}>
                            {cmt.map((item, index) => {
                                return (
                                    <View style={{ flexDirection: "row", marginBottom: 13, marginRight: 45 }} key={index}>
                                        <Image style={{ width: 45, height: 45, borderRadius: 25 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                                        <View style={{ marginLeft: 7, paddingVertical: 7, paddingHorizontal: 11, backgroundColor: '#eee', borderRadius: 7 }}>
                                            <Text style={{ fontSize: 20, fontWeight: '500' }}>{item.fullName}</Text>
                                            <Text style={{ fontSize: 20 }}>{item.content}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                    <View style={{ flexDirection: "row", padding: 7, borderTopWidth: 1, borderColor: '#f2f2f2' }}>
                        <TouchableOpacity style={{ marginLeft: 5, justifyContent: "center", alignItems: 'center' }}>
                            <Ionicons name="happy-outline" size={35} color={'#dc3545'} />
                        </TouchableOpacity>
                        <TextInput placeholder="Viết bình luận..." style={{ fontSize: 20, marginHorizontal: 10, width: '75%', backgroundColor: '#f2f2f2', borderRadius: 5, padding: 12, }} value={show} onChangeText={(text) => setShow(text)}></TextInput>
                        {show ? (
                            <TouchableOpacity style={{ marginLeft: 5, justifyContent: "center", alignItems: 'center' }} onPress={() => _cmt()}>
                                <Ionicons name="rocket-outline" size={35} color={'#dc3545'} />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
            )}
        </KeyboardAvoidingView>
    )
}