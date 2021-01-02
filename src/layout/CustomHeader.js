/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet} from 'react-native';
import {
    Header,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Text,
} from 'native-base';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signOut} from '../actions/auth';

function CustomHeader({authState, navigation, signOut}) {
    return (
        <Header 
        androidStatusBarColor="#0f4c75"
        style={{
            backgroundColor: "#0f4c75"
        }} >
            <Body>
                <Title>Social App LCO</Title>
            </Body>
            <Right>
                {authState.isAuthenticated && (
                    <>
                     <Button 
                     transparent
                     iconLeft
                     onPress={() => navigation.navigate("AddPost")} >
                         <Text style={{color: "#fdcb9e"}}>Add Post</Text>
                     </Button>
                     <Button 
                     transparent
                     onPress={() => signOut()} >
                         <Icon name="log-out-outline" style={{color: "red"}} />
                     </Button>
                    </>
                )}
            </Right>
        </Header>
    );
}

const mapStateToProps = (state) => ({
    authState: state.auth
});

const mapDispatchToProps = {
    signOut
};

CustomHeader.prototype = {
    signOut: propTypes.func.isRequired,
    authState: propTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
