import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../firebase/config';
import Posteos from "../components/Posteos/Posteos"
import firebase from 'firebase';

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            posteos: []
        }
    }

    componentDidMount() {
        db.collection("Posts").orderBy("createdAt", "desc").onSnapshot(
            docs => {
                let posts = [];
                docs.forEach (doc =>{
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posteos: posts
                    })
                })
            }
        )
    }

    

    render(){
        console.log(this.state.posteos)
        return(
            <View style={styles.view}> 
            <FlatList
            data = {this.state.posteos}
            keyExtractor= {UnPost => UnPost.id.toString()}
            renderItem = {({ item}) => <Posteos postData={item} navigation={this.props.navigation}/> }
            />
            </View>
    )
}

    

}



const styles = StyleSheet.create({
    view: {
        flex:1,
        backgroundColor: ""
    }
})




export default Home