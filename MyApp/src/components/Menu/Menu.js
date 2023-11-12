import React from 'react';
import { Text, View} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import Home from '../../screens/Home';
import PostForm from '../../screens/PostForm';
import Profile from '../../screens/Profile';
import Buscador from '../../screens/Buscador';


const Tab = createBottomTabNavigator();

function Menu (){

    return(
        <Tab.Navigator>
            <Tab.Screen name='HOME' component={Home}  options={{ tabBarIcon: () => <AntDesign name='home' color='black' size={24} /> }} /> 
            <Tab.Screen name='POST ' component={PostForm}  options={{headerShown: false, tabBarIcon: () => <AntDesign name="plus" color="black" size={24} /> }}/> 
            <Tab.Screen name='SEARCH ' component={Buscador} options={{headerShown: false, tabBarIcon: () => <FontAwesome name='search' size={24} color='black' />}}/> 
            <Tab.Screen name='PROFILE ' component={Profile}  options={{ tabBarIcon: () => <AntDesign name="user" color="black" size={24} /> }}/>
        </Tab.Navigator>
    )
    

}



export default Menu;