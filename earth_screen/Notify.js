import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton } from "react-native-paper";
import BottomSheet, { BottomSheetBackdrop, } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notify({ navigation }) {
    const baseUrl = 'http://116.108.44.227/';
    const [userID, setUser] = useState('');
    const [token, setToken] = useState('');
    const [data, setData] = useState([]);
    const [isSet, setSetting] = useState([]);
    const [isLoad, setisLoad] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ['35%'], []);
    const handlePresent = (item) => {
        sheetRef.current && sheetRef.current.present();
        setSetting(item);
        setTimeout(() => {
            setIsOpen(true);
        }, 100);
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        getData();
        api();
    }, [userID,token]);

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

    const api = () =>{
        this.interval = setInterval(() => {
            const api = baseUrl + 'Newsfeed/Notify/' + userID;
            fetch(api, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
                .then((res) => res.json())
                .then((resJson) => { setData(resJson); setisLoad(false); })
                .catch((error) => {  })
        }, 500);
    }

    const _deleteNotify = (id) => {
        const api = baseUrl + 'Newsfeed/XoaNotify/' + id;
        fetch(api, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
            .catch((error) => { console.log(error); });
    }

    const Bottom = ({ id, avatar, fullName, content }) => {
        clearInterval(this.interval);
        return (
            <BottomSheet keyboardBehavior="interactive" keyboardBlurBehavior="restore" backdropComponent={BottomSheetBackdrop} style={{ shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 15, elevation: 20 }} ref={sheetRef} snapPoints={snapPoints} enablePanDownToClose={true} onClose={() => setIsOpen(false)} backgroundStyle={{ borderRadius: 40, backgroundColor: '#e1e1e2' }} >
                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', marginHorizontal: 30, borderBottomWidth: 1 }}>
                    <Image style={{ width: 70, height: 70, borderRadius: 40 }} resizeMode="cover" source={{ uri: avatar }}></Image>
                    <View style={{ position: "absolute", top: '37%', left: '54%', backgroundColor: '#fff', height: 19, width: 19 }}></View>
                    {content == "đã chia sẻ bài viết của bạn" ? <Ionicons name="arrow-redo-circle" size={35} color={'#007267'} style={{ position: "absolute", top: '30%', left: '52%' }}></Ionicons> : undefined}
                    {content == "đã thả tim bài viết của bạn" ? <Ionicons name="heart-circle" size={35} color={'#dc3545'} style={{ position: "absolute", top: '30%', left: '52%' }}></Ionicons> : undefined}
                    {content !== "đã thả tim bài viết của bạn" && content !== "đã chia sẻ bài viết của bạn" ? <Ionicons name="chatbubble-ellipses" size={35} color={'#026c9c'} style={{ position: "absolute", top: '30%', left: '52%' }}></Ionicons> : undefined}
                    <Text style={{ fontSize: 20, flex: 1, marginLeft: 7, marginTop: 10 }}><Text style={{ fontWeight: "600" }}>{fullName} </Text>{content}</Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: 30 }}>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Ionicons name="checkmark-done-circle" size={40}></Ionicons>
                        <Text style={{ fontSize: 20 }}>Đánh dấu là đã xem</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }} onPress={() => _deleteNotify(id)}>
                        <Ionicons name="trash-bin" size={40}></Ionicons>
                        <Text style={{ fontSize: 20 }}>Xóa thông báo này</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, opacity: isOpen ? 0.4 : 1 }} onTouchStart={() => setIsOpen(false)}>
                {isLoad ? <ActivityIndicator size={"large"} style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} /> : (
                    <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{ marginVertical: 7, marginHorizontal: 7, borderRadius: 5, backgroundColor: '#fff', padding: 10 }}>
                        {/* xóa dc nhưng ko mat */}
                        {data.map((item) => {
                            return (
                                <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Single', { postId: item.postId })} >
                                    <View style={[item.status == 1 ? { marginBottom: 7, flexDirection: 'row', padding: 5, borderRadius: 5, alignItems: "center" } : { backgroundColor: '#ffe6e6', marginBottom: 7, flexDirection: 'row', padding: 5, borderRadius: 5, alignItems: "center" }]}>
                                        <View>
                                            <Image style={{ width: 70, height: 70, borderRadius: 40 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                                            <View style={{ position: "absolute", top: '65%', left: '65%', backgroundColor: '#fff', height: 19, width: 19 }}></View>
                                            {item.content == "đã chia sẻ bài viết của bạn" ? <Ionicons name="arrow-redo-circle" size={35} color={'#007267'} style={{ position: "absolute", top: '54%', left: '56%' }}></Ionicons> : undefined}
                                            {item.content == "đã thả tim bài viết của bạn" ? <Ionicons name="heart-circle" size={35} color={'#dc3545'} style={{ position: "absolute", top: '54%', left: '56%' }}></Ionicons> : undefined}
                                            {item.content !== "đã thả tim bài viết của bạn" && item.content !== "đã chia sẻ bài viết của bạn" ? <Ionicons name="chatbubble-ellipses" size={35} color={'#026c9c'} style={{ position: "absolute", top: '54%', left: '56%' }}></Ionicons> : undefined}
                                        </View>
                                        <Text style={{ fontSize: 20, flex: 1, marginLeft: 7, }}><Text style={{ fontWeight: "600" }}>{item.fullName} </Text>{item.content}</Text>
                                        <TouchableOpacity style={{ flex: 0 }} onPress={() => handlePresent(item)}>
                                            <IconButton icon="dots-horizontal" size={40}></IconButton>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                )}
            </View>

            {!isOpen ? null : (
                <Bottom {...isSet} />
            )}
        </SafeAreaView>
    )
}