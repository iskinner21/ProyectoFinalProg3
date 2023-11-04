import React, {Component} from "react";
import {auth, db} from "../firebase/config"
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native"

//Despues vamos a tener que integrar la camara, pero ncomo no está todavia, no lo ponemos//

//Lo primero que hacemos es crear el componente con estado

class Register extends Component {
    constructor(){
        super()

        //Aca creamos los estados iniciales

        this.state = {
            email: "",
            password: "",
            usuario: "",
            bio: "",
            foto: "",
            errors: "", //Este es para decirle el error por el cual el usuario no se ppudo registrar//
        }
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
//Agregar estilos//
render(){
    return(
        <View>
            <Text>{this.state.errors}</Text> 
            <TextInput
            placeholder = "Email"
            keyboardType="email-adress"
            onChangeText = {
                text =>this.setState({
                        email : text
                })
            }
            value= {this.state.email}
            />
            <TextInput
            placeholder = "Nombre de usuario"
            keyboardType="default"
            onChangeText = {
                text =>this.setState({
                    usuario: text
                })
            }
            value= {this.state.usuario}
            />
            <TextInput
            placeholder = "Contraseña"
            keyboardType="default"
            onChangeText = {
                text =>this.setState({
                    password: text
                })
            }
            value= {this.state.password}
            />
            <TextInput
            placeholder = "Mini bio"
            keyboardType="default"
            onChangeText = {
                text =>this.setState({
                    bio: text
                })
            }
            value= {this.state.bio}
            />
            <TextInput
            placeholder = "Subi una foto"
            keyboardType="default"
            onChangeText = {
                text =>this.setState({
                    foto: text
                })
            }
            value= {this.state.foto}
            />
            
{
    this.state.email == "" || this.state.password =="" ||this.state.usuario==""?
    <TouchableOpacity>
        <Text style={styles.botonerror}>Registrarme</Text>
    </TouchableOpacity>
    :
    <TouchableOpacity onPress={()=> this.register(this.state.email, this.state.password, this.state.usuario, this.state.bio, this.state.foto)}>
    <Text style={styles.botonfunciona}>Registrarme</Text>
</TouchableOpacity>

}
        <Text onPress={()=> this.props.navigation.navigate("Login")}></Text>
        </View>



    )
}

}


const styles = StyleSheet.create({

})


export default Register; 