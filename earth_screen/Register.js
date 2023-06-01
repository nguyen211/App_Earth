import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, ScrollView, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Register({ navigation }) {
    const baseUrl = 'http://116.108.44.227/';
    const [date, setDate] = useState(new Date());
    const [datePicker, setDatePicker] = useState(false);
    const [name, setName] = useState('');
    const [gmail, setGmail] = useState('');
    const [pass, setPass] = useState('');
    const [rePass, setRePass] = useState('');
    const [sdt, setSdt] = useState('');
    function showDatePicker() {
        setDatePicker(true);
    };

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
    };
    const [value, setValue] = React.useState('Nam');

    const dangKy = async () => {
        if (pass !== rePass) {
            Alert.alert('Cảnh báo', 'Mật khẩu nhắc lại phải trùng khớp với mật khẩu !!!')
        }
        else {
            try{
                await fetch(baseUrl + 'Login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullName: name,
                        phone: sdt,
                        email: gmail,
                        pass: pass,
                        birthday: date,
                        sex: value
                    })
                })
                    .then(response => {
                        if (response.status == 200) {
                            console.log(response.status);
                        }
                    })
                    .catch((error) => { console.log(error); })
            }
            catch (e) {
                console.log(error);
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <SafeAreaView style={{ marginLeft: 20, marginRight: 20 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Ionicons name="arrow-back" size={40} color="black" onPress={() => navigation.navigate('Onboarding')} />
                    <Text style={{ fontSize: 30, textAlign: 'center', color: '#dc3545', fontWeight: 'bold', }}>Đăng ký</Text>
                    <View>
                        <Text style={{ fontSize: 20, paddingTop: 15, paddingBottom: 7 }}>Họ và tên</Text>
                        <TextInput style={{ fontSize: 20, borderColor: '#dee2e6', borderWidth: 1, borderRadius: 5, paddingVertical: 12, paddingHorizontal: 12 }} value={name} onChangeText={(text) => setName(text)}></TextInput>
                        <Text style={{ fontSize: 20, paddingTop: 15, paddingBottom: 7 }}>Gmail</Text>
                        <TextInput style={{ fontSize: 20, borderColor: '#dee2e6', borderWidth: 1, borderRadius: 5, paddingVertical: 12, paddingHorizontal: 12 }} value={gmail} onChangeText={(text) => setGmail(text)}></TextInput>
                        <Text style={{ fontSize: 20, paddingTop: 15, paddingBottom: 7 }}>Mật khẩu</Text>
                        <TextInput style={{ fontSize: 20, borderColor: '#dee2e6', borderWidth: 1, borderRadius: 5, paddingVertical: 12, paddingHorizontal: 12 }} value={pass} onChangeText={(text) => setPass(text)}></TextInput>
                        <Text style={{ fontSize: 20, paddingTop: 15, paddingBottom: 7 }}>Nhập lại mật khẩu</Text>
                        <TextInput style={{ fontSize: 20, borderColor: '#dee2e6', borderWidth: 1, borderRadius: 5, paddingVertical: 12, paddingHorizontal: 12 }} value={rePass} onChangeText={(text) => setRePass(text)}></TextInput>
                        <Text style={{ fontSize: 20, paddingTop: 15, paddingBottom: 7 }}>Số điện thoại</Text>
                        <TextInput style={{ fontSize: 20, borderColor: '#dee2e6', borderWidth: 1, borderRadius: 5, paddingVertical: 12, paddingHorizontal: 12 }} value={sdt} onChangeText={(text) => setSdt(text)}></TextInput>
                        <Text style={{ fontSize: 20, paddingTop: 15, paddingBottom: 7 }}>Ngày sinh</Text>
                        {datePicker && (
                            <DateTimePicker
                                value={date}
                                mode={'date'}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24Hour={true}
                                onChange={onDateSelected}
                            />
                        )}
                        {!datePicker && (
                            <TouchableOpacity onPress={showDatePicker}>
                                <Text style={{ fontSize: 20, borderColor: '#dee2e6', borderWidth: 1, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 12 }} >{date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()}</Text>
                            </TouchableOpacity>
                        )}
                        <Text style={{ fontSize: 20, paddingTop: 15, paddingBottom: 7 }}>Giới tính</Text>
                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: '#fff', borderRadius: '20%' }}>
                                        <RadioButton value='Nam'></RadioButton>
                                    </View>
                                    <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 6 }}>Nam</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: '#fff', borderRadius: '20%' }}>
                                        <RadioButton value='Nữ'></RadioButton>
                                    </View>
                                    <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 6 }}>Nữ</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 10 }}>
                        <TouchableOpacity style={{ width: '100%', elevation: 8, borderRadius: 10, paddingVertical: 15, paddingHorizontal: 12, backgroundColor: '#dc3545', }} onPress={dangKy}>
                            <Text style={{ fontSize: 25, color: 'white', fontWeight: "bold", alignSelf: 'center' }} >Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ fontSize: 20, paddingTop: 15 }}>Đã có tài khoản? <Text style={{ color: 'blue', textDecorationLine: "underline" }} onPress={() => navigation.navigate('Login')}>Đăng nhập ngay</Text></Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}
