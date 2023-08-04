import { Button, StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import Constants from './Constants'
import ReelSet from './components/ReelSet'
import Images from './assets/Images'
import TouchableButton from './components/TouchableButton'
import TouchableSwitch from './components/TouchableSwitch'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.reelSet = null

    this.state = {
      bet: 100,
      credits: 30000,
      winnings: 0,
      level: 1,
      spinButtonActive: true
    }
  }

  spin = () => {
    if (this.state.credits - this.state.bet < 0) {
      return
    }

    this.setState({
      spinButtonActive: false,
      credits: this.state.credits - this.state.bet
    }, () => {
      this.reelSet.spin()
    })
  }
  onReelsetReady = () => {
    this.setState({
      spinButtonActive: true
    })
  }

  changeBet = (direction) => {
    let currentIndex = null
    Constants.BETS.map((el, idx) => {
      if (el === this.state.bet) {
        currentIndex = idx
      }
    })
    let nextIndex = currentIndex + direction
    if (nextIndex === -1) {
      nextIndex = Constants.BETS.length - 1
    } else if (nextIndex >= Constants.BETS.length) {
      nextIndex = 0
    }
    this.setState({
      bet: Constants.BETS[nextIndex]
    })
  }

  maxBet = () => {
    this.setState({
      bet: 1000
    })
  }


  render() {
    return (
      <View style={styles.container}  >
        <StatusBar hidden={true} />
        <Image style={styles.backgroundImage} source={Images.background} resizeMode='stretch' />
        <View style={styles.topBar}>
          <Image style={styles.backgroundTopBar} source={Images.backgroundTop} resizeMode='stretch' />
          <TouchableSwitch

            status="active"
            style={styles.buttonSound}
            image="buttonSound"
          />
          <View style={styles.creditsContainer}>
            <Image style={styles.backgroundBet} resizeMode='stretch' source={Images.backgroundBet} />
            <TouchableSwitch
              status="active"
              image="buttonBuy"
              style={styles.buttonBuy}

            />
            <Text style={styles.creditValue}>{this.state.credits}</Text>
          </View>

          <View style={styles.winContainer}>
            <Text style={styles.winTitle}>TOTAL WIN</Text>
            <Text style={styles.winValue}>{this.state.winnings}</Text>
          </View>

          <View style={styles.levelContainer}>
            <Image style={styles.backgroundLevel} resizeMode='stretch' source={Images.backgroundLevel} />
            <Image style={styles.level4} resizeMode='stretch' source={Images.level4} />
            <Text style={styles.levelTitle}>LEVEL {this.state.level}</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.reelSetContainer}>
            <ReelSet ref={(ref) => { this.reelSet = ref }} onReady={this.onReelsetReady} />
          </View>
        </View>
        <View style={styles.bottomBar}>
          <Image style={styles.bottomBar} source={Images.backgroundBottom} resizeMode='stretch' />
          <TouchableButton
            text="MAX BET"
            onPress={this.maxBet}
            status="active"
            textStyle={[styles.buttonText, styles.smallButtonText]}
            style={styles.buttonMaxBet}
            image="buttonMaxBet"
          />
          <View style={styles.gamble}>
            {/* <Image style={styles.backgroundGamble} resizeMode='stretch' source={Images.backgroundGamble} /> */}
            <Image style={styles.buttonSpade} resizeMode='stretch' source={Images.buttonSpade} />
            <Image style={styles.buttonHeart} resizeMode='stretch' source={Images.buttonHeart} />
          </View>
          <TouchableButton
            text="SPIN"
            textStyle={styles.buttonText}
            onPress={this.spin}
            style={styles.buttonSpin}
            status="active"
            image="buttonSpin"
          />
          <View style={styles.betContainer}>
            <Image style={styles.backgroundBet} resizeMode='stretch' source={Images.backgroundBet} />
            <TouchableButton
              status="active"
              onPress={() => { this.changeBet(-1) }}
              style={styles.buttonBet}
              image="buttonBetMinus"
            />
            <View style={styles.betDisplayContainer}>
              <Text style={styles.betTitle}>BET</Text>
              <Text style={styles.betValue}>{this.state.bet}</Text>
            </View>

            <TouchableButton
              status="active"
              onPress={() => { this.changeBet(1) }}
              style={styles.buttonBet}
              image="buttonBetPlus"
            />

          </View>
          <TouchableSwitch
            status="active"
            style={styles.buttonInfo}
            image="buttonInfo"
          />
        </View>

      </View>
    )
  }



}

const REELSET_HEIGHT = Constants.MAX_HEIGTH - Constants.XR * 53 - Constants.XR * 71 - Constants.XR * 10
const REELSET_WIDTH = (Constants.MAX_WIDTH / 7) * 5

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGTH
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGTH,
    position: "absolute"
  },
  topBar: {
    width: Constants.MAX_WIDTH,
    height: Constants.XR * 53,

  },
  backgroundTopBar: {
    position: "absolute",
    width: Constants.MAX_WIDTH,
    height: Constants.XR * 53
  },
  main: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGTH - Constants.XR * 53 - Constants.XR * 71,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomBar: {
    width: Constants.MAX_WIDTH,
    height: Constants.XR * 71
  },
  reelSetContainer: {
    width: REELSET_WIDTH + 2 * Constants.REEL_MARGIN * 5,
    height: REELSET_HEIGHT
  },
  buttonSpin: {
    position: "absolute",
    top: Constants.XR * 13,
    right: Constants.XR * 25,
    width: Constants.XR * 138,
    height: Constants.XR * 48
  },
  buttonText: {
    includeFontPadding: false,
    textShadowColor: '#00006CD1',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    color: "white",
    fontSize: Constants.XR * 24,
    alignItems: "center",
    justifyContent: "center",
    bottom: 3
  },
  smallButtonText: {
    fontSize: Constants.XR * 12
  },

  buttonMaxBet: {
    right: Constants.XR * 170,
    top: Constants.XR * 26,
    position: "absolute",
    width: Constants.XR * 82,
    height: Constants.XR * 32,
  },
  gamble: {
    position: "absolute",
    width: Constants.XR * 142,
    height: Constants.XR * 49,
    right: Constants.XR * 263,
    top: Constants.XR * 15
  },
  betContainer: {
    width: Constants.XR * 146,
    height: Constants.XR * 32,
    position: "absolute",
    top: Constants.XR * 25,
    left: Constants.XR * 92,
    padding: Constants.XR * 3,
    flexDirection: "row",
  },
  backgroundBet: {
    width: Constants.XR * 146,
    height: Constants.XR * 32,
    position: "absolute"
  },
  betTitle: {
    includeFontPadding: false,
    justifyContent: "center",
    color: "#C2F2F6",
    textShadowColor: "#00006CD1",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    fontSize: Constants.XR * 11,
    alignContent: "center",

  },
  betTitle: {
    includeFontPadding: false,
    justifyContent: 'center',
    color: '#C2F2F6',
    textShadowColor: "#00006C01",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    fontSize: Constants.XR * 11,
    alignContent: "center"
  },
  betValue: {
    color: "#f838f8",
    includeFontPadding: false,
    justifyContent: "center",
    fontSize: Constants.XR * 18,
    alignContent: "center",
    marginTop: Constants.XR * -3

  },
  buttonBet: {
    width: Constants.XR * 35,
    height: Constants.XR * 28,
  },
  betDisplayContainer: {
    width: Constants.XR * (146 - 8 - 64),
    height: Constants.XR * 24,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center'
  },
  backgroundGamble: {
    width: Constants.XR * 142,
    height: Constants.XR * 52,

  },
  buttonSpade: {
    right: Constants.XR * 2,
    top: Constants.XR * 2,
    position: "absolute",
    width: Constants.XR * 75,
    height: Constants.XR * 46
  },
  buttonHeart: {
    left: Constants.XR * 2,
    top: Constants.XR * 2,
    position: "absolute",
    width: Constants.XR * 75,
    height: Constants.XR * 46,
  },
  buttonInfo: {
    position: "absolute",
    left: Constants.XR * 52,
    top: Constants.XR * 25,
    width: Constants.XR * 32,
    height: Constants.XR * 32
  },
  winContainer: {
    width: Constants.XR * 146,
    height: Constants.XR * 32,
    position: "absolute",
    top: Constants.XR * 5,
    left: Constants.XR * 250,
    padding: Constants.XR * 4,
    flexDirection: "column",
    alignItems: 'center'

  },
  winTitle: {
    fontSize: Constants.XR * 18,
    left: Constants.XR * 10,
  },
  winValue: {
    color: "#f838f8",
    width: Constants.XR * 146 - Constants.XR * 48 - Constants.XR * 15,
    includeFontPadding: false,
    fontSize: Constants.XR * 18,
    left: Constants.XR * 45,
  },
  levelContainer: {
    width: Constants.XR * 146,
    height: Constants.XR * 32,
    position: "absolute",
    top: Constants.XR * 5,
    left: Constants.XR * 410,
    padding: Constants.XR * 4,
    flexDirection: "row",
    alignItems: 'center'
  },
  backgroundLevel: {
    width: Constants.XR * 146,
    height: Constants.XR * 32,
    position: "absolute",
    left: 50
  },
  level4: {
    width: Constants.XR * 80,
    height: Constants.XR * 42,
  },
  levelTitle: {
    includeFontPadding: false,
    justifyContent: "center",
    color: "#C2F2F6",
    textShadowColor: "#00006CD1",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    fontSize: Constants.XR * 11,
    alignContent: "center",
    left: 50
  },

  buttonSound: {
    position: "absolute",
    width: Constants.XR * 40,
    height: Constants.XR * 40,
    left: Constants.XR * 52,
    top: Constants.XR * 3
  },
  creditsContainer: {
    width: Constants.XR * 146,
    height: Constants.XR * 32,
    position: "absolute",
    top: Constants.XR * 3,
    left: Constants.XR * 92,
    padding: Constants.XR * 4,
    flexDirection: "row",
    alignItems: 'center'
  },
  buttonBuy: {
    width: Constants.XR * 48,
    height: Constants.XR * 36
  },
  creditValue: {
    color: "#f838f8",
    width: Constants.XR * 146 - Constants.XR * 48 - Constants.XR * 15,
    includeFontPadding: false,
    fontSize: Constants.XR * 18,
    left: 20,
    top: 5,

  },

})


