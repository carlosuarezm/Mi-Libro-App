import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
import Gallery from '../screens/Gallery.js';
import Home from '../screens/Home.js'
import BookDetails from '../screens/BookDetails.js';
import Favorites from '../screens/Favorites.js'
import {Image} from 'react-native'
import iconHome from '../assets/home.png'
import iconFav from '../assets/fav.png'
import iconSearch from '../assets/search.png'




const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        height: 90
    }
}

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={tabOptions}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? '#F96D41' : '#2D3038'

                    switch (route.name) {
                        case 'Home':
                            return (
                                <Image
                                    source={iconHome}
                                    resizeMode='contain'
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                        case 'Search':
                            return (
                                <Image
                                    source={iconSearch}
                                    resizeMode='contain'
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                        case 'Favorites':
                            return (
                                <Image
                                    source={iconFav}
                                    resizeMode='contain'
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                    }
                }
            })}
        >
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Search' component={Gallery} />
            <Tab.Screen name='Favorites' component={Favorites} />
        </Tab.Navigator>
    )
}

export default Tabs
