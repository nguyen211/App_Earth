import React, { useState, useEffect, } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView, Image, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

export default function Group({ navigation: { goBack },navigation }) {
    const [data, setData] = useState([]);
    const baseUrl = 'http://116.108.44.227/';
    const [userID, setUser] = useState('');
    const [token, setToken] = useState('');
    const [myGroup, setMyGroup] = useState([]);
    const [group, setGroup] = useState([]);

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
            fetch(baseUrl + 'Account/IsMe/' + userID, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
                .then((res) => res.json())
                .then((resJson) => { setData(resJson); setMyGroup(resJson.groups); setGroup(resJson.notInGroups) })
                .catch((error) => { })
        }, 1000);
    }

    const FirstRoute = () => (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 23, margin: 7, fontWeight: 'bold', color: '#dc3545' }}>Nhóm bạn đã tham gia</Text>
                {myGroup.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('HomeGroup',{groupId:item.groupId})} key={index} style={{ backgroundColor: '#fff', padding: 7, marginHorizontal: 7, marginTop: 7, borderRadius: 10, flexDirection: 'row', alignItems: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                            <Image style={{ width: 70, height: 70, borderRadius: 10 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 23, marginLeft: 10, fontWeight: '500' }}>{item.nameGroup}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 23, margin: 7, fontWeight: 'bold', color: '#dc3545' }}>Dành cho bạn</Text>
                {group.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('HomeGroup',{groupId:item.groupId})} key={index} style={{ backgroundColor: '#fff', padding: 7, marginHorizontal: 7, marginTop: 7, borderRadius: 10, flexDirection: 'row', alignItems: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                            <Image style={{ width: 70, height: 70, borderRadius: 10 }} resizeMode="cover" source={{ uri: item.avatar }}></Image>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 23, marginLeft: 10, fontWeight: '500' }}>{item.nameGroup}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    );

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Nhóm của bạn' },
        { key: 'second', title: 'Khám phá' },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'black'}
            inactiveColor={'black'}
            indicatorStyle={{ backgroundColor: '#dc3545' }}
            labelStyle={{ fontWeight: '500' }}
            style={{ backgroundColor: '#fff' }}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff' }}>
                <TouchableOpacity onPress={goBack} style={{ marginBottom: 7 }}>
                    <Ionicons name="chevron-back" size={35} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, marginLeft: 20, fontWeight: 'bold', marginBottom: 7, color: '#dc3545' }}>Nhóm</Text>
            </SafeAreaView>
            {/*  */}
            <TabView
                navigationState={{ index, routes }}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                })}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
        </View>
    )
}