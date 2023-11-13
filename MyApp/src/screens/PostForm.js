import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {auth, db} from '../firebase/config';
import MyCamera from '../components/my-camera/my-camera';

class NewPost extends Component{
    constructor(){
        super()
        this.state={
            user: '',
            detalle: '',
            hora: '',
            showCamera: true,
            url: '',
        }
    }

    newPost(texto, photo){
        db.collection('Posts').add({
                owner: auth.currentUser.email,
                username: this.state.user,
                detalle: this.state.detalle,
                likes: [],
                comments: [],
                photo: photo,
                createdAt: Date.now(),
        })
        .then(() => {
            this.setState({
                detalle:'',
                showCamera: true,
            })
            this.props.navigation.navigate('HOME')
        })
        .catch( e => console.log(e))
}

    onImageUpload(url) {
        this.setState({
           photo: url,
           showCamera: false,
        });
    } 

    render() {
        return(
            <View>
            {this.state.showCamera ?
                <MyCamera onImageUpload={url => this.onImageUpload(url)} navigation = {this.props.navigation}/>
                :
                <View>
                    <Text> Nuevo posteo </Text>
                    <View>
                        <TextInput  
                            placeholder='caption'
                            keyboardType='default'
                            //poner propiedad para transformarlo en textArea
                            onChangeText={ text => this.setState({detalle:text}) }
                            value={this.state.detalle}
                        /> 
                        <TouchableOpacity onPress={()=>this.newPost(this.state.detalle, this.state.photo)}>
                            <Text>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop: 10
    },
    title:{
        marginBottom:20
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8

    }
})

export default NewPost;