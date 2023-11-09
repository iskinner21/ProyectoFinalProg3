import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../firebase/config';

class PostForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    render(){return(
        <Text>SUBI TU POST</Text>
    )}

    

}




export default PostForm