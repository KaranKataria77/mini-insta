/* eslint-disable prettier/prettier */
import database from '@react-native-firebase/database';
// eslint-disable-next-line prettier/prettier
import {SET_POST, ERROR_POST} from './action.type';

export const getPost = () => async (dispatch) => {
    try {
        database()
         .ref('/posts/')
         .on('value', (snapshot) => {
             console.log('USER Data', snapshot.val())
             if (snapshot.val()) {
                 dispatch({
                     type: SET_POST,
                     payload: Object.values(snapshot.val())
                 })
             } else {
                 dispatch({
                     type: SET_POST,
                     payload: []
                 })
             }
         })
    } catch (error) {
        dispatch({
            type: ERROR_POST,
        })
    }
}
