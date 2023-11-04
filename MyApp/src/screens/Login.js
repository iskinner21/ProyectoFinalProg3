import React, {Component} from "react";
import {auth, db} from "../firebase/config"
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native"

//Despues vamos a tener que integrar la camara, pero ncomo no está todavia, no lo ponemos//

//Lo primero que hacemos es crear el componente con estado

class Login extends Component {
    constructor(){
        super()

        //Aca creamos los estados iniciales

        this.state = {
            email: "",
            password: "",
            errors: "", //Este es para decirle el error por el cual el usuario no se ppudo registrar//
        }
    }

    //Funcionalidad para poder registrarme y que se guarde en el firebase
    loguear(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( res => {
                this.setState({
                    errors: ""
                })
                this.props.navigation.navigate("Menu")
            })
            .catch(error => 
                this.setState({
                errors: `Tu error es ${error.message}`
            })
            )
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
            placeholder = "Contraseña"
            keyboardType="default"
            onChangeText = {
                text =>this.setState({
                    password: text
                })
            }
            value= {this.state.password}
            />
            
            
{
    this.state.email == "" || this.state.password =="" ?
    <TouchableOpacity>
        <Text style={styles.botonerror}>Loguaerme</Text>
    </TouchableOpacity>
    :
    <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.password)}>
    <Text style={styles.botonfunciona}>Loguaerme</Text>
</TouchableOpacity>

}
        <Text onPress={()=> this.props.navigation.navigate("Register")}></Text>
        </View>



    )
}

}


const styles = StyleSheet.create({

})


export default Login; 