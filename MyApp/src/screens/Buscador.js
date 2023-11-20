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

filtrador(texto) {
    if (texto === "") {
        this.setState({
            resultados: [],
            input: "",
            buscando: false
        });
    } else {
        let filtrador = this.state.usuarios.filter((usuario) => {
            const emailEncontrado = usuario.data.email && usuario.data.email.toLowerCase().includes(texto.toLowerCase());
            const usuarioEncontrado = usuario.data.usuario && usuario.data.usuario.toLowerCase().includes(texto.toLowerCase());
            
            // Utilizando un operador OR (||) para buscar por email o usuario
            return emailEncontrado || usuarioEncontrado;
        });

        this.setState({
            resultados: filtrador, 
            input: texto,
            buscando: true
        });
    }
}






goToProfile(item){   
     if(item.data.email === auth.currentUser.email){
         this.props.navigation.navigate("Profile")
        } 
         else{
         this.props.navigation.navigate("ProfileFriend", {user:item.data.email})
        }
    }


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