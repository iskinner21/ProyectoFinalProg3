import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import {auth, db} from '../../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from "@expo/vector-icons"

class Posteos extends Component {
    constructor(props){
        super(props)
        this.state = {
            cantidadDeLikes:'', //length del array de likes.
            miLike:false,
            comments:'',
        }
    }

    componentDidMount(){
        //chequear si el email del usuario logueado está en el array. El usuario logueado se obtiene de auth.currentUser.email. Chequear que este importado auth.
        //Si está voy a cambiar el estado miLike.
        console.log('Props.data'+this.props.postData.id)
        if(this.props.postData.data.likes.includes(auth.currentUser.email)){ 
            this.setState({
                miLike:true
            })
        }
    }

    like(){
        //agregar el email del usuario logueado a un array en el posteo.
        db.collection('Posts')
            .doc(this.props.postData.id) //identificar el documento
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //traer el email del usuario logueado con auth.currentUser.email. Chequear que este importado auth.
            })
            .then(()=> this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes +1,
                miLike: true, 
                })
            )
            .catch(e=>console.log(e))
    }

    unlike(){
        db.collection('Posts')
        .doc(this.props.postData.id) //identificar el documento
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //traer el email del usuario logueado con auth.currentUser.email. Chequear que este importado auth.
        })
        .then(()=> this.setState({
            cantidadDeLikes: this.state.cantidadDeLikes -1,
            miLike: false, 
            })
        )
        .catch(e=>console.log(e))
    }

  

    borrarFoto(){
        if(auth.currentUser.email == this.props.postData.data.owner){
            db.collection('Posts')
        .doc(this.props.postData.id) //identificar el documento
        .delete({
        })
        .then(()=> {
            console.log('Documento borrado')
            this.props.navigation.navigate('Home')
            location.reload(true)
        })
        .catch(e=>console.log(e))
        }
    }

    render(){;
        return(
            <View> 
                {auth.currentUser.email == this.props.postData.data.owner
                   ?<TouchableOpacity onPress={() => this.props.navigation.navigate('Profile',{user:this.props.postData.data.owner})}><Text style={styles.thing}>by:<Text style ={styles.user}> {this.props.postData.data.owner}</Text></Text></TouchableOpacity>
                   : <TouchableOpacity onPress={() => this.props.navigation.navigate("Perfiles",{user:this.props.postData.data.owner})}>
                        <Text style={styles.thing}>by: <Text style ={styles.user}>{this.props.postData.data.owner}</Text></Text>
                    </TouchableOpacity>
               }
                <Image 
                    style={styles.photo}
                    source={{uri: this.props.postData.data.photo}}
                    resizeMode='cover'
                />
                <View style={styles.view}>
                
                <Text style={styles.thing}> "{this.props.postData.data.detalle}" </Text>
                {this.state.miLike ? 
                    <TouchableOpacity style={styles.thing} onPress={ ()=> this.unlike() }>
                        <Text style={styles.bold}> <FontAwesome name='thumbs-up' size={17} color='blue'/>{this.state.cantidadDeLikes} <Text>No me gusta más</Text></Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.thing} onPress={ ()=> this.like() }>
                        <Text style={styles.bold}> <FontAwesome name='thumbs-up' size={17} color='blue'/>{this.state.cantidadDeLikes} <Text>Me gusta</Text></Text>
                    </TouchableOpacity>
                    
                }
                   {auth.currentUser.email == this.props.postData.data.owner
                ?<TouchableOpacity onPress={ ()=> this.borrarFoto() }>
                    <Text style={styles.thing}><FontAwesome name='trash' size={17} color='tomato'/> Borrar Post</Text>
                    </TouchableOpacity>
                : <Text></Text> 
                }
                
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Comentarios', {id: this.props.postData.id})}
                >
                    <Text style={styles.thing}><FontAwesome name='comment' size={17} color='grey'/>Comentar este mensaje</Text>
                </TouchableOpacity>

                </View>
            </View>
            
        )

        }
    }

const styles = StyleSheet.create({
    photo:{
        height:250,
        width: '80%',
        marginBottom: 5
    },
    view:{
        flex:1,
        justifyContent: "space-between",
        paddingBottom:10
    },
    thing:{
        marginBottom:2,
    },
    user:{
        fontFamily: 'sans-serif',
        fontSize: 13,
        marginTop: 10,
        marginBottom:10,
        fontWeight:'bold',
    },
    borrar:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'left',
        marginBottom:5,
    },
    bold:{
        fontWeight: 'semi-bold',
    },
}) 

export default Posteos;