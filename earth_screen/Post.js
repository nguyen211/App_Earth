import React, { useState, } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, Image, TextInput, Dimensions, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import AutoHeightImage from 'react-native-auto-height-image';
import { useRoute } from '@react-navigation/native';

export default function Post() {
    const route = useRoute();
    const [status, setStatus] = useState("");
    const list = [{ key: '1', value: 'Công khai' }, { key: '2', value: 'Bạn bè' }, { key: '3', value: 'Chỉ mình tôi' }];
    const [selectedImage, setSelectedImage] = useState(null);
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
        }
    };
    const unPicker = () => {
        setSelectedImage(null);
    };

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView style={{ flex: 1, marginVertical: 7, marginHorizontal: 7, borderRadius: 5, backgroundColor: '#fff', padding: 10, }} showsVerticalScrollIndicator={false}>
                <View >
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 45, height: 45,borderRadius:30 }} resizeMode="cover" source={{ uri: route.params.ava }}></Image>
                        <View style={{ marginLeft: 5, }}>
                            <Text style={{ fontSize: 20, marginBottom: 7 }}>{route.params.name}</Text>
                            <SelectList setSelected={(val) => setStatus(val)} data={list} save="value" boxStyles={{}} search={false} defaultOption={{ key: '1', value: 'Công khai' }}></SelectList>
                        </View>
                    </View>
                    <View style={{ marginTop: 7, flexDirection: 'row', justifyContent: "space-around" }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }} onPress={pickImageAsync}>
                            <Ionicons name="images" size={30} color={'#34a853'} />
                            <Text style={{ fontWeight: "bold" }}>  Ảnh</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 25 }}>|</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Ionicons name="happy" size={30} color={'#fbbc06'} />
                            <Text style={{ fontWeight: "bold" }}> Cảm xúc</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 25 }}>|</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Ionicons name="location-sharp" size={30} color={'#ea4335'} />
                            <Text style={{ fontWeight: "bold" }}>Vị trí</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 7, }}>
                        <TextInput editable multiline numberOfLines={5} fontSize={20} placeholder="Bạn đang nghĩ gì ?"></TextInput>
                    </View>
                    {selectedImage ? <AutoHeightImage resizeMode="cover" width={Dimensions.get("window").width - 33} source={{ uri: selectedImage }} >
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent:"flex-end", }} onPress={unPicker}>
                            <Ionicons name="close" size={35}  backgroundColor = '#fff'/>
                        </TouchableOpacity>
                    </AutoHeightImage> : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}