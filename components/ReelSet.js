import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React, { Component } from 'react'
import Constants from '../Constants'
import Reel from './Reel'

export default class ReelSet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: null,
            height: null,
        }
        this.reels = []
        this.reelsMotion = null
        this.spinResults = []
        this.winningLines = []
    }

    randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    highlightWinningLines = (currentIndex) => {
        if (!this.winningLines.length) {
            return
        }
        if (currentIndex > 0) {
            // turn off the light on the previous line
            Constants.LINES[this.winningLines[currentIndex - 1]].map((el) => {
                this.reels[el[0]].highlightAtIndex(el[1], false)
            })
        }
        if (currentIndex > this.winningLines.length - 1) {
            return
        }
        Constants.LINES[this.winningLines[currentIndex]].map((el) => {
            this.reels[el[0]].highlightAtIndex(el[1], true)
            this.reels[el[0]].shakeAtIndex[el[1]]
        })

        setTimeout(() => {
            this.highlightWinningLines[currentIndex + 1]
        }, 800)
    }

    evaluateResults = () => {
        this.winningLines = []
        for (let lineIdx = 0; lineIdx < Constants.LINES.length; lineIdx++) {
            let streak = 0
            let currentKind = null
            for (let coordIdx = 0; coordIdx < Constants.LINES[lineIdx].length; coordIdx++) {
                let coords = Constants.LINES[lineIdx][coordIdx]
                let symbolAtCoords = this.spinResults[coords[0]][coords[1]]
                if (coordIdx === 0) {
                    if (symbolAtCoords === "D") {
                        break
                    }
                    currentKind = symbolAtCoords
                    streak = 1
                } else {
                    if (symbolAtCoords !== currentKind) {
                        break
                    }
                    streak += 1
                }
            }
            if (streak >= 3) {
                this.winningLines.push(lineIdx)
            }
        }
        console.log(this.winningLines.length)

        this.highlightWinningLines(0)
    }

    spin = () => {
        this.reelsMotion = Constants.REELS
        for (let i = 0; i < Constants.REELS; i++) {
            this.reels[i].scrollByOffset(this.randomBetween(
                (Constants.REELS_REPEAT - 6) + this.reels[i].symbols.length,
                (Constants.REELS_REPEAT - 5) + this.reels[i].symbols.length
            ), (reelIdx, results) => {
                this.reelsMotion -= 1
                this.spinResults[reelIdx] = results

                if (this.reelsMotion === 0) {
                    this.evaluateResults()
                }
            })
        }
    }

    onLayout = (e) => {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height
        })
    }



    renderReels = () => {
        let reelWidth = this.state.width / Constants.REELS
        let reelList = Array.apply(null, Array(Constants.REELS)).map((el, idx) => {
            return <Reel
                width={reelWidth}
                height={this.state.height}
                key={idx}
                index={idx}
                ref={(ref) => { this.reels[idx] = ref }} />



        })
        return (
            <>
                {reelList}
            </>
        )
    }


    render() {
        return (
            <View style={styles.reelSet} onLayout={this.onLayout}>
                {this.state.width && this.state.height && this.renderReels()}
            </View>
        )
    }

}


const styles = StyleSheet.create({
    reelSet: {
        flex: 1,
        flexDirection: 'row'
    }
})



