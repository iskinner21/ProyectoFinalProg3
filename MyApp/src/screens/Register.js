import React, {Component} from "react";
import {auth, db} from "../firebase/config"
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native"
import MyCamera from "../components/my-camera/my-camera";



class Register extends Component {
    constructor(){
        super()

      

        this.state = {
            email: "",
            password: "",
            usuario: "",
            bio: "",
            foto: "",
            mostrarCamara: false,
            permisos: true,
            errors: "", 
        }
    }

componentDidMount(){ 
           auth.onAuthStateChanged(
            usuario => {
            if (usuario){
                this.props.navigation.navigate("Menu")
            }
        })
    }

onImageUpload(url) {
        this.setState({
            foto: url,
            mostrarCamara: false,
        })
    }
    //Funcionalidad para poder registrarme y que se guarde en el firebase

register(email, password, user, bio, image){
    auth.createUserWithEmailAndPassword(email, password)
    .then(res =>{
        db.collection("users").add({
            //Aca ponemos los datos que nos pasa el usuario pasa mandarlo al firebase//
            email: email,
            user: user, 
            bio: bio,
            image: image,
            createdAt: Date.now()
        })
        .then(()=> {
            this.setState({
                email: "",
                password: "",
                usuario: "",
                bio: "",
                foto: "",
                errors: ""

            })
            this.props.navigation.navigate("Login")
        })
        .catch(error => console.log(error))
    })
    .catch(error => this.setState({
        errors:`Tu error es: ${error.message}`
    }))
}

render(){
    return(
       <>
       <Image style={styles.image} source={require('../../assets/logoLPF.jpg')} />
            
        <View style={styles.formContainer}>
            
            <Text style={styles.bienvenida}>¡Bienvenido a la red social de La Liga Profesional Argentina!</Text>
            <Text>{this.state.errors}</Text> 
            <TextInput  style={styles.input}
            placeholder = "Email"
            keyboardType="email-adress"
            onChangeText = {
                text =>this.setState({
                        email : text
                })
            }
            value= {this.state.email}
            />
            <TextInput  style={styles.input}
            placeholder = "Nombre de equipo"
            keyboardType="default"
            onChangeText = {
                text =>this.setState({
                    usuario: text
                })
            }
            value= {this.state.usuario}
            />
            <TextInput  style={styles.input}
            placeholder = "Contraseña"
            keyboardType="default"
            onChangeText = {
                text =>this.setState({
                    password: text
                })
            }
            value= {this.state.password}
            secureTextEntry={true}
            />
            <TextInput  style={styles.input}
            placeholder = "Describi a tu equipo en pocas palabras"
            keyboardType="default"
            onChangeText = {
                text =>this.setState({
                    bio: text
                })
            }
            value= {this.state.bio}
            />
            {this.state.mostrarCamara ?
                    <View style={styles.fotoPerfil}>
                        <MyCamera onImageUpload={url => this.onImageUpload(url)} />
                    </View>
                    :
                    <TouchableOpacity style={styles.input} onPress={() => this.setState({ mostrarCamara: true })}>
                        <Text >Subi una foto con tu camiseta!</Text>
                    </TouchableOpacity>
                }

            
{
    this.state.email == "" || this.state.password =="" ||this.state.usuario==""?
    <TouchableOpacity>
        <Text style={styles.botonerror}>Registrarme</Text>
    </TouchableOpacity>
    :
    <TouchableOpacity onPress={()=> this.register(this.state.email, this.state.password, this.state.usuario, this.state.bio, this.state.foto)}>
    <Text style={styles.botonfunciona}>Goooooool!</Text>
</TouchableOpacity>

}
        <Text style={styles.loginbutton} onPress={()=> this.props.navigation.navigate("Login")}>¿Ya tenes cuenta? Logueate aca</Text>
        </View>
       </>


    )
}

}


const styles = StyleSheet.create({

    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    image:{
        height: 200,
        width: 150,
        position: 'relative',
        marginTop: 10,
        marginBottom: 5,
        alignSelf: 'center'

    },
    bienvenida:{
        textAlign: 'center',
        fontFamily: 'arial',
        fontSize: 20,

    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    fotoPerfil:{ 
        heigth: 400 ,

    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    botonerror:{
        backgroundColor:'red',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
    },
    botonfunciona:{
        backgroundColor:'green',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    loginbutton:{
        paddingHorizontal: 10,
        paddingVertical: 15,
        textAlign: 'center',
        marginVertical: 10,
    },

})


export default Register; 