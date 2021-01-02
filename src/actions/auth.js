/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';


export const signUp = (data) => async (dispatch) => {
    console.log(data)

    const {name, instaName, email, password, bio, country, image} = data;

    auth().createUserWithEmailAndPassword(email, password)
     .then((data) => {
         console.log(data)
         console.log("User created succesfully")

         database()
          .ref('/users/' + data.user.uid)
          .set({
              name, 
              email, 
              password,
              bio,
              country,
              image, 
              instaName,
              uid: data.user.uid,
          })
           .then(() => console.log("Data set sucessfully"))
           Snackbar.show({
               text: "Account create successfully",
               textColor: "white",
               backgroundColor: "#1b262c"
           })
     })
     .catch((error) => {
         console.log(error)
         Snackbar.show({
             text: "Signup failed",
             textColor: "white",
             backgroundColor: "red"
         })
     })
}

export const signIn = (data) => async (dispatch) => {
    console.log(data)

    const {email, password} = data;

    auth().signInWithEmailAndPassword(email, password)
     .then(() => {
         console.log("Sign In Succesfully")
         Snackbar.show({
             text: "account Sigin success",
             textColor: "white",
             backgroundColor: "#1b262c"
         })
     })
     .catch((error) => {
         console.log(error)
         Snackbar.show({
             text: "SignIn failed",
             textColor: "white",
             backgroundColor: "red"
         })
     })
}

export const signOut = () => async (dispatch) => {
    auth().signOut()
     .then(() => {
        Snackbar.show({
            text: "SignOut Success",
            textColor: "white",
            backgroundColor: "#1b262c"
        })
     })
     .catch((error) => {
         console.log(error)
         Snackbar.show({
            text: "SignOut failed",
            textColor: "white",
            backgroundColor: "red"
        })
     })
}