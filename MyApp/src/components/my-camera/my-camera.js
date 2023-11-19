import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Camera } from 'expo-camera';
import { storage } from '../../firebase/config';

class MyCamera extends Component{
    constructor(){
        super()
        this.state={
            permissions: false,
            showCamera: true,
            foto: ''
        }    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( () => this.setState({
                permissions: true
            }))
            .catch( e => console.log(e))
    }

    takePicture(){
        this.metodosDeCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    foto: photo.uri,
                    showCamera: false
                })
            })
            .catch( e => console.log(e))
        }
        
    savePhoto(){
        fetch(this.state.foto) //buscar la foto de la carpeta temporal en nuestra máquina
            .then(res => res.blob()) //Quedarnos con la foto en formato binario.
            .then( image => { //Ya podemos trabajar el dato final.
                //Crear el destino y nombre con el que se guarda la foto en Storage
                const refStorage = storage.ref(`photos/${Date.now()}.jpg`);
                refStorage.put(image) //Mandar la foto al storage. Put es asincrónico.
                    .then(()=>{
                        refStorage.getDownloadURL() //la url pública de firebase.
                        .then( url => this.props.onImageUpload(url))
                    })
            })
            .catch(e => console.log(e))
    }

    repetir(){
        this.setState({
        foto: '',
        showCamera: true
      })
    }
    
    cancelar(){
        this.setState({
            foto:'',
            showCamera: false
        }) 
        this.props.navigation.navigate('HOME');
    }

    render(){
        return(
            <View>
            {
                this.state.permissions ? 
                    this.state.showCamera ?
                    <View style={styles.cameraBody}>
                        <Camera
                            style={styles.cameraBody}
                            type = {Camera.Constants.Type.front}
                            ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara }
                        />
                        <TouchableOpacity style={styles.button1} onPress={()=>this.takePicture()}>
                            <Text>Sacar foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button1} onPress={()=>this.cancelar()}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <Image 
                            style={styles.preview}
                            source={{uri: this.state.foto}}
                            resizeMode='cover'
                        />
                        <View style={styles.cont}>
                            <TouchableOpacity style={styles.button2} onPress={()=>this.savePhoto()}>
                                <Text>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button2} onPress={()=>this.repetir()}>
                                <Text>Repetir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                :
                    <Text>No tengo permisos</Text>
            }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    cameraBody: {
        height: '50vh',
        width: '100vw',
        position: 'absolute',
        flexDirection: 'row'
    },
    button1: {
        marginHorizontal: 16,
        backgroundColor: 'white',
        height: 20,
        width: '20%',
        borderRadius: 20,
        textAlign: 'center',
        alignContent: 'bottom'
    },
    button2: {
        marginHorizontal: 16,
        backgroundColor: 'lightgrey',
        height: 20,
        width: '20%',
        margin:120,
        borderRadius: 20,
        textAlign: 'center',
        alignContent: 'bottom'
    },
    cont:{
        flexDirection: 'row',
    }
})

export default MyCamera;