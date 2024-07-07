import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import SearchResults from '../components/SearchResults';

const employees = () => {
    const [employees, setEmployees] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get("http://192.168.29.218:9000/employees");
                setEmployees(response.data)
            } catch (error) {
                console.log("failed to get employees dataQQ12.", error)
            }
        }
        fetchEmployeeData();
    }, [])
    console.log(employees)
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
                <Ionicons style={{ marginLeft: 10 }} name="arrow-back" size={24} color="black" />
                <Pressable style={{
                    flexDirection: 'row', alignItems: 'center'
                    , marginHorizontal: 7, gap: 10, backgroundColor: 'white', height: 40
                    , borderRadius: 4, flex:1
                }}>
                    <AntDesign name="search1" size={20} color="black" />
                    <TextInput value={input} onChangeText={(text) => setInput(text)} style={{ flex: 1 }} placeholder='Search' />

                    {employees.length > 0 && (
                        <View>
                            <Pressable onPress={() => router.push('/(home)/addDetails')}>
                                <AntDesign name="pluscircle" size={30} color="#0072b1" />
                            </Pressable>
                        </View>
                    )}
                </Pressable>
            </View>
            {employees.length > 0 ? (
                <SearchResults data={employees} input={input} setInput={setInput} />
            ) : (

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                    <Text>No data found!!!</Text>
                    <Text>Click on + burron to add employee</Text>
                    <Pressable onPress={() => router.push('/(home)/addDetails')}>
                        <AntDesign style={{ marginTop: 30 }} name="pluscircle" size={24} color="black" />
                    </Pressable>
                </View>
            )}
        </View>
    )
}

export default employees

const styles = StyleSheet.create({})