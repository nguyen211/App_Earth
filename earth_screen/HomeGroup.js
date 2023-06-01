import React, { useState, useEffect, } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Image,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AutoHeightImage from 'react-native-auto-height-image';

export default function HomeGroup({ navigation: { goBack }, navigation }) {
    const route = useRoute();
    const baseUrl = 'http://116.108.44.227/';
    const [data, setData] = useState([]);
    const [post, setPost] = useState([]);
    const autoWidth = Dimensions.get("window").width;

    useEffect(() => {
        fetch(baseUrl + 'Groups/Groups/' + route.params.groupId, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((resJson) => { setData(resJson); })
            .catch((error) => { })
        fetch(baseUrl + 'Groups/GroupPosts/' + route.params.groupId, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((res) => res.json())
            .then((resJson) => { setPost(resJson); })
            .catch((error) => { })
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff' }}>
                <TouchableOpacity onPress={goBack} style={{ marginBottom: 7 }}>
                    <Ionicons name="chevron-back" size={35} />
                </TouchableOpacity>
                <Text style={{ fontSize: 23, marginLeft: 20, fontWeight: 'bold', marginBottom: 7, color: '#dc3545' }}>{data.nameGroup}</Text>
            </SafeAreaView>
            {/*  */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={{ width: '100%', height: 300 }} resizeMode="cover" source={{ uri: data.avatar }}></Image>
                <View>
                    <Text style={{ fontSize: 23, fontWeight: '700', marginTop: 10, marginHorizontal: 10  }}>{data.nameGroup}</Text>
                    {data.statusGroup == true ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginHorizontal: 10  }}>
                            <Ionicons name="earth" size={20} />
                            <Text style={{ fontSize: 20, }}> Nhóm công khai    </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}> {data.member.length}</Text>
                            <Text style={{ fontSize: 20, }}> thành viên</Text>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginHorizontal: 10  }}>
                            <Ionicons name="lock-closed" size={20} />
                            <Text> Nhóm kín</Text>
                        </View>
                    }
                    {/*  */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10  }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#00cc00', padding: 15, width: '45%', borderRadius: 10, marginRight: 10 }}>
                            <Ionicons name="people" size={20} color={'#fff'} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}> Tham gia</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#61b4f6', padding: 15, width: '45%', borderRadius: 10 }}>
                            <Ionicons name="add" size={20} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Mời</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10  }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ccc', padding: 10, borderRadius: 15 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bài đăng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ccc', padding: 10, borderRadius: 15, marginHorizontal: 7 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ccc', padding: 10, borderRadius: 15 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thành viên</Text>
                        </TouchableOpacity>
                    </View>
                    {/*  */}
                    <View style={{ backgroundColor: '#ccc', paddingBottom: 5 }}></View>
                    {post.map((item, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity style={{ flexDirection: 'row', margin: 10  }} onPress={() => navigation.navigate('Single', { postId: item.postId, userId: userID })}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Acc', { userId: item.userId })}>
                                        <Image style={{ width: 45, height: 45, borderRadius: 30 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                                    </TouchableOpacity>
                                    <View style={{ marginLeft: 5, }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('Acc', { userId: item.userId })}>
                                            <Text style={{ fontSize: 20, }}>{item.fullName}</Text>
                                        </TouchableOpacity>
                                        <Text style={{ color: '#9a9a9a', }}>{item.datepost} ' {item.accessModifier == 'Công khai' ? <Ionicons name="earth" size={20} /> : <Ionicons name="people" size={20} />}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <Text style={{ fontSize: 20, marginHorizontal: 10  }}>{item.content}</Text>
                                    <AutoHeightImage width={autoWidth} style={{ marginTop: 5, }} resizeMode="contain" source={{ uri: item.img1 }}></AutoHeightImage>
                                </View>
                                <View style={{ marginTop: 5, flexDirection: 'row', marginHorizontal: 10 }}>
                                    {item.liked == true ?
                                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }} onPress={() => _unHeart(item.postId)}>
                                            <Ionicons name="heart" size={30} color={'#dc3545'} />
                                            <Text style={{ fontSize: 20, }}>{item.like}</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }} onPress={() => _heart(item.postId)}>
                                            <Ionicons name="heart-outline" size={30} color={'#dc3545'} />
                                            <Text style={{ fontSize: 20, }}>{item.like}</Text>
                                        </TouchableOpacity>
                                    }
                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginHorizontal: 40 }} /*onPress={() => handlePresent(item.comment)}*/ onPress={() => navigation.navigate('Single', { postId: item.postId, userId: userID })}>
                                        <Ionicons name="chatbox-ellipses-outline" size={30} />
                                        <Text style={{ fontSize: 20, }}>{item.comment.length}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                                        <Ionicons name="arrow-redo-outline" size={30} color={'blue'} />
                                        <Text style={{ fontSize: 20, }}>{item.share}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ backgroundColor: '#ccc', paddingBottom: 5, marginVertical:7 }}></View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}