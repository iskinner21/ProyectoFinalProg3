import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../firebase/config';

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    render(){return(
        <Text>BIENVENIDO A LA HOME PAGE</Text>
    )}

    

}




export default Home