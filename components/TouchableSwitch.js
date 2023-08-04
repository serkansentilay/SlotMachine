import { Image, TouchableWithoutFeedback, View } from 'react-native'
import React, { Component } from 'react'
import Images from '../assets/Images'


export default class TouchableSwitch extends Component {
    constructor(props) {
        super(props)

        this.images = {
            "active": Images[this.props.image],
            "inactive": Images[this.props.image + "Inactive"],


        }

        this.state = {
            status: this.props.status
        }

    }

    handlePressOut = () => {
        let newStatus = this.state.status === "active" ? "inactive" : "active"
        this.setState({
            status: newStatus
        })
        this.props.onSwitch && this.props.onSwitch(newStatus)
    }


    render() {
        return (
            <TouchableWithoutFeedback onPressOut={this.handlePressOut}>
                <View style={this.props.style}>
                    <Image
                        source={this.images[this.state.status]}
                        style={{
                            width: this.props.style.width,
                            height: this.props.style.height,
                            position: "absolute",
                            resizeMode: this.props.style.resizeMode || "stretch"
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
