import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { auth, db } from "../firebase/config";
import Post from '../components/Posteos/Posteos';
import Posteos from '../components/Posteos/Posteos';
import { FontAwesome } from "@expo/vector-icons"

class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            datosUser: null,
            posteos: []
        }
    }
    
    componentDidMount () {
        db.collection('users').onSnapshot(
            docs => {
                docs.forEach(doc => {
                    const data = doc.data();
                    console.log("data",data);
                    if(data.email == auth.currentUser.email){
                        this.setState({
                            datosUser: data
                        })
                    }
                })
            }
        )
        db.collection('Posts').orderBy('createdAt', 'desc').where('owner', '==', auth.currentUser.email).onSnapshot(
            (docs => {
                let posts = []
                docs.forEach(doc => { 
                  posts.push({
                    data: doc.data()
                  })
                  this.setState({
                    posteos: posts,
                    loading: false
                  }, ()=> console.log(this.state.posteos))  
                  })
                }
              )
        )
    }
  

    Logout(){
        auth.signOut();
        this.props.navigation.navigate('Login');
    }
//<image style={styles.user}>{this.state.datosUser?.image}</image>

    render(){
        console.log("state.DatosUser",this.state.datosUser);
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.thing} onPress={ ()=> {this.props.navigation.navigate('HOME')} }>
                        <Text style={styles.bold}> <FontAwesome name='arrow-left' size={17} color='blue'/>{this.state.cantidadDeLikes} <Text style={styles.bold}>Volver a inicio</Text></Text>
                    </TouchableOpacity>
                <Text style={styles.user}>@{this.state.datosUser?.user}</Text>
                <Text style={styles.bio}> Biografia: {this.state.datosUser?.bio}</Text>
                <TouchableOpacity onPress={ ()=> this.Logout()} >
                    <Text style={styles.log}>Logout</Text>
                </TouchableOpacity>
                <Text>Tus {this.state.posteos.length} posts: {auth.currentUser.email}</Text>
                <FlatList 
                    data={this.state.posteos}
                    keyExtractor={item=>item.id}
                    renderItem={({item}) => <Posteos postData={item} navigation={this.props.navigation}/> }
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    photo:{
        flex:1,
        borderRadius:40,
        justifyContent: 'center',
    },
    container:{
        margin:10
    },
    user:{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: 15,
        marginTop: 10,
        fontWeight:'bold'
    },
    log:{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: 11,
        marginTop: 7,
        color: 'grey',
        fontStyle: 'italic'
    },
    bio:{
        textAlign: 'center',
        fontWeight: 'semi-bold',
        fontSize: 12,
        marginTop: 3,
    },
}) 

export default Profile;