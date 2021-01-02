/* eslint-disable no-labels */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import AddPost from './screens/AddPost';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import CustomeHeader from './layout/CustomHeader';
import {SET_USER, IS_AUTHENTICATED} from './actions/action.type';
import EmptyContainer from './components/EmptyContainer';
import {requestPermission} from './utlis/AskPermission';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function App({authState}) {

  const dispatch = useDispatch();

  const onAuthStateChange = (user) => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });

      console.log(user._user.uid);

    database()
     .ref(`/users/${user._user.uid}`)
     .on('value', (snapshot) => {
       console.log("user detail", snapshot.val())
       dispatch({
         type: SET_USER,
         payload: snapshot.val()
       });
     });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };

  useEffect(() => {
    requestPermission();
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber
  }, []);

  if (authState.loading) {
    return <EmptyContainer />
  }

  return (
    <>
     <NavigationContainer>
       <Stack.Navigator 
       screenOptions={{
         header: (props) => <CustomeHeader {...props} />
       }} >
         {authState.isAuthenticated ? (
           <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddPost" component={AddPost} />
           </>
         ) : (
           <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
           </>
         )}
       </Stack.Navigator>
     </NavigationContainer>
    </>
  );
}

const mapStateToProps = (state) => ({
  authState: state.auth
});

export default connect(mapStateToProps)(App);
