import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { auth, db } from "../firebase/config";
import Posteos from '../components/Posteos/Posteos';
import { FontAwesome } from "@expo/vector-icons"

class ProfileFriend extends Component {
    constructor(props){
        super(props)
        this.state = {
            datosUser:[],
            posteos:[],
            owner: this.props.route.params.user
        }
    };

    componentDidMount () {
        console.log('route',this.state.owner)
        db.collection('users').onSnapshot(
            docs => {
                docs.forEach(doc => {
                    const data = doc.data();
                    console.log(data);
                    if(data.email == this.state.owner){
                        this.setState({
                            datosUser: data
                        })
                    }
                    console.log(this.state.datosUser)
                })
            }
        )
        db.collection('Posts').orderBy('createdAt', 'desc').where('owner', '==', this.state.owner).onSnapshot(
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

    render(){
        console.log("state.DatosUser",this.state.datosUser);
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.thing} onPress={ ()=> {this.props.navigation.navigate('HOME')} }>
                        <Text style={styles.bold}> <FontAwesome name='arrow-left' size={17} color='blue'/>{this.state.cantidadDeLikes} <Text style={styles.bold}>Volver</Text></Text>
                    </TouchableOpacity>
                <Text style={styles.user}>@{this.state.datosUser?.user}</Text>
                <Text style={styles.bio}> Biografia: {this.state.datosUser?.bio}</Text>
                <Text>Los {this.state.posteos.length} posts de: {this.state.datosUser.owner}</Text>
                <FlatList 
                    data={this.state.posteos}
                    keyExtractor={item=>item.id.toString()}
                    renderItem={({item}) => <Posteos postData={item} navigation={this.props.navigation}/> }  
                />
            </View>

        )
    }
};

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
    bold:{
        fontWeight: 'bold',
    },
}) 






export default ProfileFriend
