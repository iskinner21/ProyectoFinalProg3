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
        <View style={styles.formContainer}>
            <Text>{this.state.errors}</Text> 
            <TextInput
            style={styles.input}
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
            style={styles.input}
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
            
            
{
    this.state.email == "" || this.state.password =="" ?
    <TouchableOpacity >
        <Text style={styles.botonerror}>Loguearme</Text>
    </TouchableOpacity>
    :
    <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.password)}>
    <Text style={styles.botonfunciona}>Loguaerme</Text>
</TouchableOpacity>

}
        <Text style={styles.registerbutton} onPress={()=> this.props.navigation.navigate("Register")}>¿No tenes cuenta? Registrate aca</Text>
        </View>



    )
}

}


const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
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
        borderStyle: 'solid',
        borderColor: 'black'
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
    registerbutton:{
        paddingHorizontal: 10,
        paddingVertical: 15,
        textAlign: 'center',
        marginVertical: 10,
       
    },

})


export default Login; 