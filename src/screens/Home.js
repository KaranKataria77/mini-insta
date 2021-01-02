/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList, Text} from 'react-native';
import {Container, H1} from 'native-base';
import {connect} from 'react-redux';
import {getPost} from '../actions/post';
import propTypes from 'prop-types';
import EmptyContainer from '../components/EmptyContainer';
import Post from '../components/Post';


function Home({getPost, postState, userDetail}) {

    useEffect(() => {
        getPost()
    }, [])

    if (postState.loading) {
        return <EmptyContainer />
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
            data={postState.posts}
            keyExtractor = {(item) => item.id}
            renderItem = {({item, index, separators}) => (
                <Post item={item} userDetails={userDetail} key={item.id} />
            )}
            ListEmptyComponent={() => (
                <Container style={styles.emptyContainer}>
                    <H1>No Post Found</H1>
                </Container>
            )} />
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => ({
    postState: state.post,
    userDetail: state.auth.user,
});

const mapStateToDispatch = {
    getPost
}

Home.propTypes = {
    getPost: propTypes.func.isRequired,
    postState: propTypes.object.isRequired,
    userDetail: propTypes.object,
}

export default connect(mapStateToProps, mapStateToDispatch)(Home);

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      justifyContent: 'flex-start',
      padding: 4,
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      backgroundColor: '#1b262c',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
