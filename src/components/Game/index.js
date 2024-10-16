import {Component} from 'react'

import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import GameButton from '../GameButton'

import 'reactjs-popup/dist/index.css'

import './index.css'

class Game extends Component {
  state = {
    score: 0,
    isClicked: false,
    yourChoice: '',
    opponentChoice: '',
    result: '',
  }

  onPlayAgain = () => {
    this.setState({isClicked: false})
  }

  onClickChoice = choiceItem => {
    const {choicesList} = this.props
    const yourId = choiceItem.id
    const randomIndex = Math.floor(Math.random() * 3)
    const opponentId = choicesList[randomIndex].id
    const yourImage = choiceItem.imageUrl
    const oppImage = choicesList[randomIndex].imageUrl
    let matchResult = ''

    switch (true) {
      case (yourId === 'PAPER' && opponentId === 'ROCK') ||
        (yourId === 'SCISSORS' && opponentId === 'PAPER') ||
        (yourId === 'ROCK' && opponentId === 'SCISSORS'):
        matchResult = 'YOU WON'

        break
      case (yourId === 'ROCK' && opponentId === 'PAPER') ||
        (yourId === 'PAPER' && opponentId === 'SCISSORS') ||
        (yourId === 'SCISSORS' && opponentId === 'ROCK'):
        matchResult = 'YOU LOSE'

        break
      default:
        matchResult = 'IT IS DRAW'
    }

    switch (matchResult) {
      case 'YOU WON':
        this.setState(prevState => ({
          score: prevState.score + 1,
          result: matchResult,
          yourChoice: yourImage,
          opponentChoice: oppImage,
          isClicked: true,
        }))
        break
      case 'YOU LOSE':
        this.setState(prevState => ({
          score: prevState.score - 1,
          result: matchResult,
          yourChoice: yourImage,
          opponentChoice: oppImage,
          isClicked: true,
        }))
        break
      default:
        this.setState(prevState => ({
          score: prevState.score,
          result: matchResult,
          yourChoice: yourImage,
          opponentChoice: oppImage,
          isClicked: true,
        }))
    }
  }

  renderResult = () => {
    const {yourChoice, opponentChoice, result} = this.state
    return (
      <div className="result-container">
        <div className="top-result-container">
          <div className="choice-container">
            <h1 className="name">YOU</h1>
            <img src={yourChoice} alt="your choice" className="choice-image" />
          </div>
          <div className="choice-container">
            <h1 className="name">OPPONENT</h1>
            <img
              src={opponentChoice}
              alt="opponent choice"
              className="choice-image"
            />
          </div>
        </div>
        <div className="button-container">
          <p className="name">{result}</p>
          <button
            className="play-button"
            type="button"
            onClick={this.onPlayAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  renderPlaying = () => {
    const {choicesList} = this.props

    return (
      <div className="list-container">
        {choicesList.map(each => (
          <GameButton
            key={each.id}
            onClickChoice={this.onClickChoice}
            itemDetails={each}
          />
        ))}
      </div>
    )
  }

  render() {
    const {score, isClicked} = this.state

    return (
      <div className="bg-container">
        <div className="main-container">
          <div className="top-container">
            <div className="text-container">
              <h1 className="heading">
                Rock
                <br /> Paper
                <br /> Scissors
              </h1>
            </div>
            <div className="score-container">
              <p className="score-heading">Score</p>
              <p className="score">{score}</p>
            </div>
          </div>
          {isClicked ? this.renderResult() : this.renderPlaying()}
          <div className="pop-up-container">
            <Popup
              modal
              trigger={
                <button type="button" className="trigger-button">
                  RULES
                </button>
              }
            >
              {close => (
                <div className="popup-container">
                  <button
                    type="button"
                    className="close-button"
                    onClick={() => close()}
                  >
                    <RiCloseLine className="close-icon" />
                  </button>
                  <div className="img-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                      alt="rules"
                      className="rules-image"
                    />
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>
    )
  }
}

export default Game
