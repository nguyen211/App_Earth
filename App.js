import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

//Login
import Onboarding from "./earth_screen/Onboarding";
import Login from "./earth_screen/Login";
import Register from "./earth_screen/Register";
//Screen
import Home from "./earth_screen/Home";
import Acc from "./earth_screen/Acc";
import Notify from "./earth_screen/Notify";
import SinglePost from "./earth_screen/SinglePost";
import Mess from "./earth_screen/Mess";
import Chat from "./earth_screen/Chat";
import Friend from "./earth_screen/Friend";
import PostScreen from "./earth_screen/Post";
import Setting from "./earth_screen/Setting";
import Group from "./earth_screen/Group";
import HomeGroup from "./earth_screen/HomeGroup";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function LoginScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      <HomeStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <HomeStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}
function HomeScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Earth" component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name="Post" component={PostScreen} options={{ headerShown: true, title: 'Bài viết mới', headerTitleStyle: { fontSize: 20, fontWeight: '500' }, }} />
      <HomeStack.Screen name="Single" component={SinglePost} options={{ headerShown: false }} />
      <HomeStack.Screen name="Acc" component={Acc} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}
function NotifyScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Notifies" component={Notify} options={{ title: 'Thông báo', headerTintColor: '#dc3545', headerTitleStyle: { paddingLeft: 5, fontSize: 25, fontWeight: 'bold' }, }} />
      <HomeStack.Screen name="Single" component={SinglePost} options={{ headerShown: false }} />
      <HomeStack.Screen name="Acc" component={Acc} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}
function MessScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Mess" component={Mess} options={{ headerShown: false }} />
      <HomeStack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      <HomeStack.Screen name="Acc" component={Acc} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}
function FriendScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Friend" component={Friend} options={{ title: 'Bạn bè', headerTintColor: '#dc3545', headerTitleStyle: { paddingLeft: 5, fontSize: 25, fontWeight: 'bold' } }} />
      <HomeStack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      <HomeStack.Screen name="Acc" component={Acc} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}
function SettingScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
      <HomeStack.Screen name="Acc" component={Acc} options={{ headerShown: false }} />
      <HomeStack.Screen name="Friend" component={Friend} options={{ title: 'Bạn bè', headerTintColor: '#dc3545', headerTitleStyle: { paddingLeft: 5, fontSize: 25, fontWeight: 'bold' } }} />
      <HomeStack.Screen name="Mess" component={Mess} options={{ headerShown: false }} />
      <HomeStack.Screen name="Group" component={Group} options={{ headerShown:false }}/>
      <HomeStack.Screen name="HomeGroup" component={HomeGroup} options={{ headerShown:false }}/>
    </HomeStack.Navigator>
  )
}

export default function App({ navigation }) {
  const baseUrl = 'http://116.108.44.227/';
  const [userID, setUser] = useState('');
  const [token, setToken] = useState('');
  const [listReq, setListReq] = useState([]);
  const [listNotify, setNotify] = useState([]);

  // useEffect(() => {
  //   this.interval = setInterval(() => {
  //     fetch(baseUrl + 'Newsfeed/Notify/' + userID, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
  //       .then((res) => res.json())
  //       .then((resJson) => { setNotify(resJson); });
  //     fetch(baseUrl + 'Newsfeed/FriendRequest/' + userID, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
  //       .then((res) => res.json())
  //       .then((resJson) => { setListReq(resJson); });
  //   }, 500);

  // }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen name={"LoginScreen"} component={LoginScreen} options={{ headerShown: false, tabBarStyle: { display: 'none' }, tabBarButton: () => null }} />
        <Tab.Screen name={"HomeScreen"} component={HomeScreen} options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="compass-outline" size={40} color={focused ? '#dc3545' : 'black'} />
          )
        }} />
        <Tab.Screen name={"MessScreen"} component={MessScreen} options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="chatbox-ellipses-outline" size={40} color={focused ? '#dc3545' : 'black'} />
          )
        }} />
        <Tab.Screen name={"FirendScreen"} component={FriendScreen} options={{
          headerShown: false,
          /*tabBarBadge: (listReq.length > 0 ? listReq.length : undefined),*/ tabBarIcon: ({ focused }) => (
            <Ionicons name="people-circle-outline" size={40} color={focused ? '#dc3545' : 'black'} />
          )
        }} />
        <Tab.Screen name={"NotifyScreen"} component={NotifyScreen} options={{
          headerShown: false,
          /*tabBarBadge: (listNotify.length > 0 ? listNotify.length : undefined),*/ tabBarIcon: ({ focused }) => (
            <Ionicons name="notifications-outline" size={40} color={focused ? '#dc3545' : 'black'} />
          )
        }} />
        <Tab.Screen name={"SettingScreen"} component={SettingScreen} options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="settings-outline" size={40} color={focused ? '#dc3545' : 'black'} />
          )
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}