import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import GameScreen from "../game-screen/game-screen.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import {GameType} from "../../const.js";


class App extends PureComponent {
  constructor(props) {
    super(props);
    this._handleWelcomeButtonClick = this._handleWelcomeButtonClick.bind(this);
    this._handleUserAnswer = this._handleUserAnswer.bind(this);
    this._handleUserAnswerOnExactPath = this._handleUserAnswerOnExactPath.bind(this);
    this.state = {
      step: -1,
    };
  }

  _handleWelcomeButtonClick() {
    this.setState({step: 0});
  }

  _handleUserAnswer() {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  }

  _handleUserAnswerOnExactPath() {
  }


  _renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={this._handleWelcomeButtonClick}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <ArtistQuestionScreen
                question={question}
                onAnswer={this._handleUserAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <GenreQuestionScreen
                question={question}
                onAnswer={this._handleUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/artist">
            <ArtistQuestionScreen
              question={questions[1]}
              onAnswer={this._handleUserAnswerOnExactPath}
            />
          </Route>
          <Route exact path="/genre">
            <GenreQuestionScreen
              question={questions[0]}
              onAnswer={this._handleUserAnswerOnExactPath}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};


export default App;
