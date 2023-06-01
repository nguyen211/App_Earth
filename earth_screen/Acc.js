import React, { useState, useEffect, } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Image, Dimensions, } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

export default function Acc({ navigation: { goBack }, navigation }) {
    const route = useRoute();
    const baseUrl = 'http://116.108.44.227/';
    const autoWidth = Dimensions.get("window").width;
    const [data, setData] = useState([]);
    const [fri, setFri] = useState([]);
    const [post, setPost] = useState([]);
    
    useEffect(() => {
        fetch(baseUrl + 'Account/IsMe/' + route.params.userId, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((resJson) => { setData(resJson); })
            .catch((error) => { console.log(error); })
        fetch(baseUrl + 'Account/MyFriend/' + route.params.userId, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((resJson) => { setFri(resJson); })
            .catch((error) => { console.log(error); })
        fetch(baseUrl + 'Account/MyPost/' + route.params.userId, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((resJson) => { setPost(resJson); })
            .catch((error) => { console.log(error); })
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={goBack} style={{ marginBottom: 7 }}>
                    <Ionicons name="chevron-back" size={35} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '600', marginBottom: 7 }}>{data.fullName}</Text>
            </SafeAreaView>
            {/*  */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingBottom: 80 }}>
                    <AutoHeightImage width={autoWidth} style={{ marginTop: 5, }} resizeMode="contain" source={{ uri: data.anhBia }}></AutoHeightImage>
                    <Image style={{ width: 150, height: 150, borderRadius: 100, marginLeft: 10, position: 'absolute', top: '60%' }} resizeMode="cover" source={{ uri: data.avatar }}></Image>
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: '700' }}>{data.fullName}</Text>
                    <Text style={{ fontSize: 21, marginTop: 7 }}>{data.otherInfo}</Text>
                </View>
                <View style={{ backgroundColor: '#ccc', paddingBottom: 5 }}></View>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 21, marginBottom: 10 }}><Text style={{ fontWeight: '700' }}>Bạn bè</Text> : {data.friend} bạn</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {fri.slice(0, 3).map((item, index) => {
                            return (
                                <View key={index} style={{ width: 130, borderRadius: 7, backgroundColor: '#fff', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                                    <Image style={{ width: 130, height: 130, borderTopLeftRadius: 7, borderTopRightRadius: 7 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                                    <Text style={{ fontSize: 21, fontWeight: '600', padding: 5 }}>{item.fullName}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {fri.slice(3, 6).map((item, index) => {
                            return (
                                <View key={index} style={{ width: 130, marginTop: 10, borderRadius: 7, backgroundColor: '#fff', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                                    <Image style={{ width: 130, height: 130, borderTopLeftRadius: 7, borderTopRightRadius: 7 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                                    <Text style={{ fontSize: 21, fontWeight: '600', padding: 5 }}>{item.fullName}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
                
                {post.map((item, index) => {
                    return (
                        <View key={index}>
                            <View style={{ backgroundColor: '#ccc', paddingBottom: 5, marginVertical:10 }}></View>
                            <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: 10 }} onPress={() => navigation.navigate('Single', { postId: item.postId })}>
                                <TouchableOpacity>
                                    <Image style={{ width: 45, height: 45, borderRadius: 30 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                                </TouchableOpacity>
                                <View style={{ marginLeft: 5, }}>
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: 20, }}>{item.fullName}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: '#9a9a9a', }}>{item.datepost} ' 
                                        {item.accessModifier == 'Công khai' ? <Ionicons name="earth" size={20} /> : null}
                                        {item.accessModifier == 'Bạn bè' ? <Ionicons name="people" size={20} /> : null}
                                        {item.accessModifier == 'Chỉ mình t' ? <Ionicons name="lock-closed" size={20} /> : null}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 5, }}>
                                <Text style={{ fontSize: 20, marginHorizontal: 10 }}>{item.content}</Text>
                                <AutoHeightImage width={autoWidth} style={{ marginTop: 5, }} resizeMode="contain" source={{ uri: item.image1 }}></AutoHeightImage>
                            </View>
                            <View style={{ marginTop: 5, flexDirection: 'row', marginHorizontal: 10 }}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                                    <Ionicons name="heart-outline" size={30} color={'#dc3545'} />
                                    <Text style={{ fontSize: 20, }}>{item.like.length}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginHorizontal: 40 }} onPress={() => navigation.navigate('Single', { postId: item.postId })}>
                                    <Ionicons name="chatbox-ellipses-outline" size={30} />
                                    <Text style={{ fontSize: 20, }}>{item.comment.length}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                                    <Ionicons name="arrow-redo-outline" size={30} color={'blue'} />
                                    <Text style={{ fontSize: 20, }}>{item.share}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}