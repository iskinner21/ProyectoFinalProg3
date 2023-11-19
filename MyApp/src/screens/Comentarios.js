import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { auth, db } from "../firebase/config";
import firebase from 'firebase';
import { FontAwesome } from "@expo/vector-icons"


class Comentarios extends Component {
    constructor(props){
        super(props)
        this.state={
            comentarios:[],
            nuevoComentario:''
        } 
    }

    componentDidMount(){
        const idDoc = this.props.route.params.id
            db
            .collection('Posts')
            .doc(idDoc)
            .onSnapshot(doc => {
                this.setState({
                    comentarios:doc.data().comments
                })
            })
    }

    onSubmit(oneComment){
        const comment ={
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            description: oneComment
        }

        if(oneComment !== ''){
            db
            .collection('Posts')
            .doc(this.props.route.params.id)
            .update({
                comments:firebase.firestore.FieldValue.arrayUnion(comment)
            })
            .then(response => this.setState({nuevoComentario:''}))
            .catch(error => console.log(error))
        }

    }

    deleteComment(borrarComment){
        db.collection('Posts').where('createdAt','==',borrarComment)
        .onSnapshot(
            docs => {
              console.log('comment'+ docs);
              docs.forEach( doc => {
                doc.ref.delete()
              })
            }
          ) 
    
    }
    
    render(){
        return (
            
          <View>
            <TouchableOpacity style={styles.thing} onPress={ ()=> {this.props.navigation.navigate('HOME')} }>
                     <Text style={styles.bold}> <FontAwesome name='arrow-left' size={17} color='blue'/>{this.state.cantidadDeLikes} <Text style={styles.bold}>Volver</Text></Text>
                </TouchableOpacity>
            {
                this.state.comentarios.length < 1
                ? <Text>No hay comentarios por ahora</Text>
                : <FlatList
                data={this.state.comentarios}
                keyExtractor={( item ) => item.createdAt.toString()}
                renderItem={ ( {item} ) => <View style={styles.comment}>
                    <Text>{item.owner}</Text>
                    <Text>{item.description}</Text>
                    <TouchableOpacity 
                    onPress={()=>this.deleteComment(item.createdAt)}
                    style={styles.btnComment}
                    >
                        <Text>Borrar</Text>
                    </TouchableOpacity>
                </View>}
                />

            }
            <View>
                <TextInput
                    placeholder='comment'
                    onChangeText={
                        (text) => this.setState({nuevoComentario : text})
                    }
                    value={this.state.nuevoComentario}
                    keyboardType='default'
                    style={styles.inputComment}
                />
                <TouchableOpacity 
                    onPress={()=> this.onSubmit(this.state.nuevoComentario)}
                    style={styles.btnComment}
                >
                    <Text>Enviar</Text>
                </TouchableOpacity>
                
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      width:'100%',
      height:'100%',
      justifyContent:'center',
      alignItems:'center'
    },
    comment:{
        marginTop:30,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerComment:{
      flexDirection:'row',
      width:'90%'
    },
    inputComment:{
      borderWidth:1,
      backgroundColor:'#c3c3c3',
      width:'80%',
      borderRadius: 3,
      marginLeft: 10,
      paddingLeft: 10,
      marginTop: 20
    },
    btnComment:{
      width:'15%',
      padding:10,
      backgroundColor:'#d3d3d3',
      borderRadius: 3,
      marginLeft: 10,
      marginTop: 10,
      alignItems: 'center',
  
    },
    thing:{
        marginTop: 10,
        marginLeft: 10
    }
  })

export default Comentarios; 