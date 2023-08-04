import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import React, { Component } from 'react'
import Constants from '../Constants'
import Images from "../assets/Images"

export default class Symbol extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: true,
            animatedValue: new Animated.Value(0)
        }
    }


    getImage = () => {
        switch (this.props.symbol) {
            case "B":
                return Images.bell;
                break;
            case "C":
                return Images.cherries;
                break;
            case "A":
                return Images.apple;
                break;
            case "D":
                return Images.diamond;
                break;
            case "G":
                return Images.grapes;
                break;
            case "L":
                return Images.lemon;
                break;
            case "M":
                return Images.watermelon;
                break;
            case "O":
                return Images.orange;
                break;
            case "X":
                return Images.plus;
                break;
            case "7":
                return Images.seven;
                break;
            case "S":
                return Images.gem;
                break;
            default:
                return Images.apple


        }
    }

    setActive = (active) => {
        this.setState({
            active: active
        })
    }

    shake = () => {
        this.state.animatedValue.setValue(0)
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: 750,
                useNativeDriver: true
            }
        ).start()
    }

    render() {
        let symbolSource = this.getImage()
        let symbolAnimation = [
            {
                scale: this.state.animatedValue.interpolate({
                    inputRange: [0, 0.25, 0.5, 1],
                    outputRange: [1, 1.25, 0.75, 1]
                })
            },
            {
                rotate: this.state.animatedValue.interpolate({
                    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                    outputRange: ["0deg", "15deg", "0deg", "-15deg", "0deg", "15deg", "0deg", "-15deg", "0deg", "15deg", "0deg"]
                })
            }
        ]
        return (
            <View style={[styles.symbol, { width: this.props.width, height: this.props.height }]}>
                <Animated.Image
                    style={{
                        width: this.props.width - 20,
                        height: this.props.height - 20,
                        opacity: this.state.active ? 1 : 0.3,
                        transform: symbolAnimation
                    }}
                    resizeMode='contain'
                    source={symbolSource} />
            </View>
        )
    }
}



const styles = StyleSheet.create({
    symbol: {
        padding: 10
    }
})
