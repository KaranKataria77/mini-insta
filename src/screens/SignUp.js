/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import {
    Container,
    Form,
    Item,
    Input,
    Text,
    Button,
    Thumbnail,
    Content
} from 'native-base';
import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';
import * as ImagePicker from 'react-native-image-picker';
import {options} from '../utlis/options';

import propTypes from 'prop-types';
import {signUp} from '../actions/auth';
import {connect} from 'react-redux';

function SignUp({signUp}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [instaUserName, setInstaUserName] = useState('');
    const [country, setCountry] = useState('');
    const [bio, setBio] = useState('');
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [image, setImage] = useState('https://www.gstatic.com/devrel-devsite/prod/veaa02889f0c07424beaa31d9bac1e874b6464e7ed7987fde4c94a59ace9487fa/firebase/images/touchicon-180.png');

    const chooseImage = async () => {
        ImagePicker.launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
              console.log(response);
              uploadImage(response);
            //   if (response.didCancel) {
            //     console.log('User cancelled image picker')
            // } else if (response.error) {
            //     console.log('ImagePicker Error: ', response.error)
            // } else if (response.customButton) {
            //     console.log('User tapped custom button', response.customButton)
            // } else {
            //     console.log(response)
            //     // uploadImage(response)
            // }
            },
          );

            
        // })
    }

    const uploadImage = async (response) => {
        setImageUploading(true);
        const reference = storage().ref(response.fileName)

        const task = reference.putFile(response.uri)
        task.on('state_changed', (taskSnapshot) => {
            const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes ) * 1000;

            setUploadStatus(percentage)

            task.then(async () => {
                const url = await reference.getDownloadURL()

                setImage(url)
                setImageUploading(false)
            })
        })
    }

    const doSignUp = async () => {
        signUp({name, email, password, instaUserName, country, bio, image})
    }


    return (
        <Container style={styles.container}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={chooseImage}>
                  <Thumbnail large source={{uri: image}} />
                </TouchableOpacity>
              </View>
    
              {imageUploading && (
                <ProgressBar progress={uploadStatus} style={styles.progress} />
              )}
    
              <Form>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="name"
                    value={name}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setName(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="email"
                    value={email}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setEmail(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="password"
                    value={password}
                    secureTextEntry={true}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setPassword(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Instagram user name"
                    value={instaUserName}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setInstaUserName(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Your Short Bio"
                    value={bio}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setBio(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="country"
                    value={country}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setCountry(text)}
                  />
                </Item>
                <Button regular block onPress={doSignUp}>
                  <Text>SignUp</Text>
                </Button>
              </Form>
            </ScrollView>
          </Content>
        </Container>
      );
}

const mapStateToDispatch = {
    signUp: (data) => signUp(data)
}

SignUp.propTypes = {
    signUp: propTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    imageContainer: {
      alignItems: 'center',
      marginVertical: 5,
    },
    progress: {width: null, marginBottom: 20},
    formItem: {
      marginBottom: 20,
    },
  });

export default connect(null, mapStateToDispatch)(SignUp);
