import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Image, ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AutoHeightImage from 'react-native-auto-height-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, { BottomSheetTextInput, BottomSheetBackdrop, } from '@gorhom/bottom-sheet';

const baseUrl = 'http://116.108.44.227/';

export default function Home({ navigation }) {
  const [userID, setUser] = useState('');
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);
  const [isMe, setIsMe] = useState([]);
  const [isLoad, setisLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const autoWidth = Dimensions.get("window").width;
  const [cmt, setCmt] = useState([]);
  const [show, setShow] = useState('');

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
      .then((resJson) => { setIsMe(resJson); })
      .catch((error) => { })

    const api = baseUrl + 'Newsfeed/Post/' + userID;
    this.interval = setInterval(() => {
      fetch(api, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then((res) => res.json())
        .then((resJson) => { setData(resJson); setisLoad(false); })
        .catch(() => { })
        .finally(() => setisLoad(false))
    }, 1000);
  }

  //bottomshet
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['65%'], []);
  const [isOpen, setIsOpen] = useState(false);
  const handlePresent = (item) => {
    sheetRef.current && sheetRef.current.present();
    setCmt(item);
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  };
  //reload screen
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  //heart
  const _heart = (postId) => {
    fetch(baseUrl + 'Newsfeed/NewLike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId: postId,
        userId: userID
      })
    });
  }

  //unheart
  const _unHeart = (postId) => {
    fetch(baseUrl + 'Newsfeed/UnHeart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId: postId,
        userId: userID
      })
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ opacity: isOpen ? 0.4 : 1 }} onTouchStart={() => setIsOpen(false)}>
        <SafeAreaView style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center', backgroundColor: '#fff' }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#dc3545', paddingBottom: 10, paddingLeft: 10 }}>Earth</Text>
        </SafeAreaView>
        {isLoad ? <ActivityIndicator size={"large"} style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} /> : (
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {/* New post */}
            <View style={{ marginTop: 7, marginLeft: 7, marginRight: 7, borderRadius: 5, backgroundColor: '#fff', padding: 10, flexDirection: 'row' }}>
              <Image style={{ width: 45, height: 45, borderRadius:30 }} resizeMode="cover" source={{ uri: isMe.avatar }}></Image>
              <TouchableOpacity style={{ paddingLeft: 5, justifyContent: "center", alignItems: 'center' }} onPress={() => navigation.navigate('Post', {userId:userID,name:isMe.fullName,ava:isMe.avatar} )}>
                <Text style={{ fontSize: 20 }}>Bạn đang nghĩ gì vậy, {isMe.fullName} ?</Text>
              </TouchableOpacity>
              <Ionicons name="image" size={35} color={'#dc3545'} style={{ marginLeft: '2%', marginTop: 3, }} />
            </View>

            {data.map((item, index) => {
              return (
                <View style={{ marginTop: 7, marginLeft: 7, marginRight: 7, borderRadius: 5, backgroundColor: '#fff', padding: 10, flexDirection: "column", }} key={index}>
                  <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Single', { postId: item.postId, userId:userID })}>
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
                  <View style={{ marginTop: 5, }}>
                    <Text style={{ fontSize: 20, }}>{item.content}</Text>
                    <AutoHeightImage width={autoWidth - 34} style={{ marginTop: 5, }} resizeMode="contain" source={{ uri: item.image1 }}></AutoHeightImage>
                  </View>
                  <View style={{ marginTop: 5, flexDirection: 'row', }}>
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
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginHorizontal: 40 }} /*onPress={() => handlePresent(item.comment)}*/ onPress={() => navigation.navigate('Single', { postId: item.postId, userId:userID })}>
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
        )}
      </View>
      {/* {!isOpen ? null : (
        <BottomSheet keyboardBehavior="interactive" keyboardBlurBehavior="restore" backdropComponent={BottomSheetBackdrop} style={{ shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 15, elevation: 20 }} ref={sheetRef} snapPoints={snapPoints} enablePanDownToClose={true} onClose={() => setIsOpen(false)} backgroundStyle={{ borderRadius: 40, backgroundColor: '#e1e1e2' }} >
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}><Text style={{ fontSize: 23, fontWeight: '500', color: '#dc3545' }}>Bình luận</Text></View>
          <View style={{ marginHorizontal: 7, height: '77%' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {cmt.map((item, index) => {
                return (
                  <View style={{ flexDirection: "row", marginBottom: 13, marginRight: 45 }} key={index}>
                    <Image style={{ width: 45, height: 45, borderRadius: 25 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                    <View style={{ marginLeft: 7, paddingVertical: 7, paddingHorizontal: 11, backgroundColor: '#fff', borderRadius: 7 }}>
                      <Text style={{ fontSize: 20, fontWeight: '500' }}>{item.fullName}</Text>
                      <Text style={{ fontSize: 20 }}>{item.content}</Text>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 10, }}>
            <TouchableOpacity style={{ marginLeft: 5, justifyContent: "center", alignItems: 'center' }}>
              <Ionicons name="happy-outline" size={35} color={'#dc3545'} />
            </TouchableOpacity>
            <BottomSheetTextInput placeholder="Viết bình luận..." style={{ fontSize: 20, marginHorizontal: 10, width: '75%', backgroundColor: '#fff', borderRadius: 5, paddingVertical: 12, paddingHorizontal: 12 }} onChangeText={(text) => setShow(text)}></BottomSheetTextInput>
            {show ? (
              <TouchableOpacity style={{ marginLeft: 5, justifyContent: "center", alignItems: 'center' }}>
                <Ionicons name="rocket-outline" size={35} color={'#dc3545'} />
              </TouchableOpacity>
            ) : null}
          </View>
        </BottomSheet>
      )} */}
    </View>
  )
}
