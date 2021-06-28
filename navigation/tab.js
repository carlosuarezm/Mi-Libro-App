import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home.js'
import Favorites from '../screens/Favorites.js'
import { Image } from 'react-native'
import iconHome from '../assets/images/home.png'
import iconFav from '../assets/images/fav.png'

const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        backgroundColor: '#FFFFFF',
        borderRadius: 0,
        height: 60
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
            <Tab.Screen name='Favorites' component={Favorites} />
        </Tab.Navigator>
    )
}

export default Tabs