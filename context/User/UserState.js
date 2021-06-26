import React from 'react'
import { useReducer } from 'react'
import UserReducer from './UserReducer.js'
import UserContext from './UserContext.js'
import AsyncStorage from '../../utils/storage'

const UserState = (props) => {
    
    const initialState = null 
    
    const [state, dispatch] = useReducer(UserReducer, initialState);

    //-------------------- Historial de Búsquedas --------------------
    const setUserAuthenticated = (user) => {
        dispatch({
            type: 'SET_USER_AUTHENTICATED',
            payload: user
        })
        console.log('Estoy en SETUSER del CONTEXTO')
        console.log(user)
        console.log(state)
    }

    const deleteUserAuthenticated = (user) => {
        AsyncStorage.clearData()
        dispatch({
            type: 'DELETE_USER_AUTHENTICATED',
            payload: user
        })
    }

    return(
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
