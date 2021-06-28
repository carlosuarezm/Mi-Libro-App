import React from 'react'
import { useReducer } from 'react'
import UserReducer from './UserReducer.js'
import UserContext from './UserContext.js'
import AsyncStorage from '../../utils/storage'

const UserState = (props) => {

    const initialState = null

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const setUserAuthenticated = (user) => {
        dispatch({
            type: 'SET_USER_AUTHENTICATED',
            payload: user
        })
    }

    const deleteUserAuthenticated = (user) => {
        AsyncStorage.clearData()
        dispatch({
            type: 'DELETE_USER_AUTHENTICATED',
            payload: user
        })
    }

    return (
        <UserContext.Provider value={{
            state,
            setUserAuthenticated,
            deleteUserAuthenticated
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;
