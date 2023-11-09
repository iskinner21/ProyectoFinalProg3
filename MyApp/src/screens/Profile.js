import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../firebase/config';

class Profile extends Component{
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    render(){return(
        <TouchableOpacity></TouchableOpacity>
    )}

    

}




export default Profile