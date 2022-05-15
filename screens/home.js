import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import Button from 'react-native-button';

export default function Home({ navigation }) {

    //Starting the counter
    const [isCounting, setIsCounting] = useState(false);
    const [time, setTime] = useState(0);
    const [stopTime, setStopTime] = useState(0);
    const [count, setCount] = useState('0')
    const [update, setUpdate] = useState(true)

    const pressHistoryHandler = () => {
        navigation.push('History')
    }
    
    //Animating play button 
    const animation = useRef()

    useEffect(() => {
        let timeToBeSet = Date.now() - time;
        if(isCounting){
            let d = new Date(timeToBeSet);
            setCount(d.getMinutes()+':'+d.getSeconds());
            console.log('update time')
        }
    },[update])

    useEffect(() => {
        animation.current.play();
        const timer = window.setInterval(() => {
            console.log('update')
            setUpdate((update) => !update)
        },1000);
        return () => {window.clearInterval(timer)}
    },[])

    const playAnimation = () => {
        console.log(isCounting)
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
        movePlayButtonBack();
    }

    const startCounter = () => {
        console.log('start counter called')
        setTime(Date.now())
    }


    const movePlayButton = () => {
        Animated.timing(yAnimatedOffsetPlayButton, {
            toValue: 200,
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

    //Styles
    const buttonContainerStyle = {
        alignSelf: 'center',
        padding:10,
        height:45,
        width: '65%',
        margin: 5, 
        overflow:'hidden', 
        borderRadius:4, 
        backgroundColor: '#6ed467'}

    const buttonContainerStyleSecondary = {
        alignSelf: 'center',
        padding:10,
        height:45,
        width: '65%',
        margin: 5, 
        overflow:'hidden', 
        borderRadius:4, 
        borderColor:'#6ed467',
        borderWidth: 2,
        backgroundColor: 'white'}

    const buttonStyle = {
        fontSize: 20,
        color: 'white',
    }

    const buttonStyleSecondary = {
        fontSize: 20,
        color: '#6ed467'
    }

    return (
        <SafeAreaView
            style={{
            }}
        >
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
            </Animated.View>
        </SafeAreaView>
    );
}