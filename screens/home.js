import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Animated, Keyboard } from 'react-native';
import LottieView from 'lottie-react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import Button from 'react-native-button';
import { createDatabaseIfNotExists, getTasks, saveSession } from '../services/database-service';
import Autocomplete from 'react-native-autocomplete-input';
import { Stylesheet } from '../shared/consts';


export default function Home({ navigation }) {

    //Starting the counter
    const [isCounting, setIsCounting] = useState(false);
    const [time, setTime] = useState(0);
    const [stopTime, setStopTime] = useState(0);
    const [count, setCount] = useState('0')
    const [update, setUpdate] = useState(true)
    const [showInputField, setShowInputField] = useState(false);

    const pressHistoryHandler = () => {
        navigation.push('History')
    }

    const pressOptionsHandler = () => {
        navigation.push('Options')
    }
    
    //Animating play button 
    const animation = useRef()

    useEffect(() => {
        let timeToBeSet = Date.now() - time;
        if(isCounting){
            let d = new Date(timeToBeSet);
            setCount(d.getMinutes()+':'+d.getSeconds());
        }
    },[update])

    useEffect(() => {
        createDatabaseIfNotExists();
        getTasks();
        animation.current.play();
        const timer = window.setInterval(() => {
            setUpdate((update) => !update)
        },1000);
        return () => {window.clearInterval(timer)}
    },[])

    const playAnimation = () => {
        if(isCounting === false){
            animation.current.play();
            startCounter();
            setIsCounting(true);
            setTimeout(() => {
                movePlayButton();
                showCounter();
            },350)
        }
    }

    const yAnimatedOffsetPlayButton = useState(new Animated.Value(0))[0];
    const counterVisibleaAnimated = useState(new Animated.Value(0))[0];

    const stopCounter = () => {
        setIsCounting(false);
        setStopTime(Date.now());
        saveSession({TStart: time, TStop: Date.now()});
        movePlayButtonBack();
        setShowInputField(false);
    }

    const startCounter = () => {
        console.log('start counter called')
        setTime(Date.now())
        setTimeout(() => {
            setShowInputField(true);
        },700)
    }


    const movePlayButton = () => {
        Animated.timing(yAnimatedOffsetPlayButton, {
            toValue: 150,
            duration: 300,
            useNativeDriver: false
        }).start();
    }
    
    const movePlayButtonBack = () => {
        Animated.timing(yAnimatedOffsetPlayButton, {
            toValue: 0,
            duration:300,
            useNativeDriver: false
        }).start();
    }

    const showCounter = () => {
        Animated.timing(counterVisibleaAnimated, {
            toValue:1,
            duration: 500
        }).start();
    }

    const hideCounter = () => {
        Animated.timing(counterVisibleaAnimated, {
            toValue: 0,
            duration: 500
        }).start();
    }

    const shouldSetResponse = () => true;

    //Styles
    const buttonContainerStyle = {
        alignSelf: 'center',
        padding:10,
        height:45,
        width: '65%',
        margin: 5, 
        overflow:'hidden', 
        borderRadius:4, 
        backgroundColor: Stylesheet.colors.GREEN_PRIMARY}

    const buttonContainerStyleSecondary = {
        alignSelf: 'center',
        padding:10,
        height:45,
        width: '65%',
        margin: 5, 
        overflow:'hidden', 
        borderRadius:4, 
        borderColor:Stylesheet.colors.GREEN_PRIMARY,
        borderWidth: 2,
        backgroundColor: 'white'}

    const buttonStyle = {
        fontSize: 20,
        color: 'white',
    }

    const buttonStyleSecondary = {
        fontSize: 18,
        padding: 0,
        color: Stylesheet.colors.GREEN_PRIMARY
    }

    const autocompleteStyle = {
        container: {
            width:"75%",
            alignSelf: "center",
            height: "11%",
            marginTop: "10%",
            position: 'absolute',
            zIndex: 5
        },
        inputField: {
            height: "100%",
            fontSize: 24,
            backgroundColor: 'white',
            borderWidth: 0,
            padding: 2,
            paddingLeft: 6,
            paddingRight: 6
        }
    }

    return (
        <SafeAreaView
            onResponderRelease={() => {Keyboard.dismiss()}}
            onStartShouldSetResponder={ shouldSetResponse }
            style={{
            }}
        >
            {showInputField ? <View style={autocompleteStyle.container}>
                <Autocomplete 
                    style={autocompleteStyle.inputField}
                    autoComplete={false}
                    />
            </View> : null }
            <Animated.View style={{top: yAnimatedOffsetPlayButton}}>
                <Animated.View style={{
                    alignItems: 'center',
                    width: '100%',
                    opacity: counterVisibleaAnimated
                }}>
                    <Text
                        style={{
                            fontSize: 64,
                            marginTop:"10%",
                        }}
                    >{count}</Text>
                </Animated.View>
                <TouchableWithoutFeedback
                    onPress={playAnimation}
                    style={{
                        width:'100%',
                        alignItems: 'center',
                    }}
                >
                    <LottieView
                        ref={animation}
                        source={require('../assets/70933-play-button.json')}
                        loop={false}
                        style={{
                            width: 200,
                            height: 200
                        }}
                    ></LottieView>
                </TouchableWithoutFeedback>
                <Button 
                    onPress={stopCounter}
                    containerStyle={buttonContainerStyle}
                    style={buttonStyle}
                >Stop</Button>
                <Button 
                    onPress={pressHistoryHandler}
                    style={buttonStyleSecondary}
                    containerStyle={buttonContainerStyleSecondary}
                    >History</Button>
                <Button 
                onPress={pressOptionsHandler}
                style={buttonStyleSecondary}
                containerStyle={buttonContainerStyleSecondary}
                >Options</Button>
            </Animated.View>
        </SafeAreaView>
    );
}