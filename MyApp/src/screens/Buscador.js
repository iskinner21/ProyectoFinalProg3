import React, { Component } from 'react'
import { Text, View, StyleSheet,  TextInput, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';

class Buscador extends Component{
    constructor(props) {
        super(props)
        this.state = {
            input: "",
            usuarios: [],
            resultados: [],
            buscando: false, 
        }
    }

//Asi lo entiende firebase: 
//Si a la tabla le decimos Coleccion
//A cada uno de los "usuarios" le decis "documento"
//Nos guardamos la informacion de todos los usuarios en info, y despues lo pasamos al state
    componentDidMount() {
db.collection("users").onSnapshot(
    docs => {
        let info = [];
        docs.forEach (doc =>{
            info.push({
                id: doc.id,
                data: doc.data()
            })
            this.setState({
                usuarios: info
            })
        })
    }
)
    }

//Filtrador//
//Vaya buscando palabra por palabra y encontrar los datos que coincidan con la palabra. De usuarios//

filtrador(texto){
    //Si el texto esta vacio, no le muestro nada
    if(texto ===""){
        this.setState({
            resultados: [],
            input:"",
            buscando: false
        })
    }else{
        //Darle los resultados del que esta buscando
        let filtrador = this.state.usuarios.filter((usuario) => usuario.data.email.toLowerCase().includes(texto.toLowerCase()))
        this.setState({
            resultados: filtrador, 
            input: texto,
            buscando: true
        })
    }
}




//Ir a perfil//

//Basicamente hay que agarrar y hacer esto://

 goToProfile(item){
<<<<<<< HEAD
//     //Data.email es el mail de alguien, si coincide con currentUser.email es porque sos el dueño de ese mail!! coincide y es tu perfil
     if(item.data.email === auth.currentUser.email){
         this.props.navigation.navigate("Profile")
        } 
//     //Aca si caigo en else, es porque no me pertenece ese posteo o lo quera fuera//
         else{
         this.props.navigation.navigate("ProfileFriend", {user:this.state.usuarios.data.user})//ACA CAMBIAR POR PERFILES DE OTROS
        }
    }
=======
     //Data.email es el mail de alguien, si coincide con currentUser.email es porque sos el dueño de ese mail!! coincide y es tu perfil
     if(item.data.email === auth.currentUser.email){
         this.props.navigation.navigate("Profile")
     } 
     //Aca si caigo en else, es porque no me pertenece ese posteo o lo quera fuera//
     else{
         this.props.navigation.navigate("Profile")//ACA CAMBIAR POR PERFILES DE OTROS
     }
 }
>>>>>>> 7197c48de04d866a802273d292569b7ba033f834

    render(){
        console.log('buscador',this.state.usuarios)
        console.log('resultados',this.state.resultados)
        return(
            <View style={styles.formConteiner}>

                <TextInput 
                placeholder='Busca tu equipo favorito!'
                keyboardType='default'
                onChangeText={texto => this.filtrador(texto)}
                value= {this.state.input}
                style={styles.input}
                />


{
    this.state.resultados.length ===0 && this.state.buscando === true ? 
    <Text>No hay resultados de usuarios que coincidan</Text>
    :
    <FlatList
    data = {this.state.resultados}
    keyExtractor= {UnUsuario => UnUsuario.id.toString()}
    renderItem = {({ item}) => <Text onPress={()=>this.goToProfile(item)} >{item.data.email}</Text> }
    />
}
            </View>


        )
    }

    

}


const styles = StyleSheet.create({
    view: {
        flex:1,
        backgroundColor: "rgb(250, 0, 250)"
    },
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
})

export default Buscador