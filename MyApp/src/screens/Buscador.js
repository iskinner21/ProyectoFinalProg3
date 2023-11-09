import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../firebase/config';

class Buscador extends Component{
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    render(){return(
        <Text>Buscador</Text>
    )}

    

}




export default Buscador