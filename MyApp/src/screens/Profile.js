import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { auth, db } from "../firebase/config";
import Post from '../components/Posteos/Posteos';

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
                    console.log("t",data);
                    if(data.user == auth.currentUser.email){
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
                docs.forEach(doc => { //recorremos el array de documentos
                  posts.push({ //pusheamos en el array de resultados un objeto literal con el id de cada documento y la la info del documento que se obtiene con el metodo data()
                    id: doc.id,
                    data: doc.data()
                  })
                  this.setState({ //guardamos los datos en el estado del componente que luego renderizara los posteos dentro de la flatlist
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

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.user}>@{this.state.datosUser?.user}</Text>
                <Text style={styles.bio}> Biografia: {this.state.datosUser?.biog}</Text>
                <TouchableOpacity onPress={ ()=> this.Logout()} >
                    <Text style={styles.log}>Logout</Text>
                </TouchableOpacity>
                <Text>Tus posts: {auth.currentUser.email}</Text>
                <FlatList 
                    data={this.state.posteos}//renderizamos posteos que seteamos en el estado anterior
                    keyExtractor={item=>item.id.toString()}
                    renderItem={({item}) => <Post postData={item} navigation={this.props.navigation}/> }
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