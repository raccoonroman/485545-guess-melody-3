import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";


class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this.state = {
      userAnswers: [false, false, false, false],
    };
  }

  _handleInputChange(i) {
    return ({target: {checked: value}}) => {
      const userAnswers = [...this.state.userAnswers];
      userAnswers[i] = value;
      this.setState({userAnswers});
    };
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const {onAnswer, question} = this.props;
    const {userAnswers} = this.state;
    onAnswer(question, userAnswers);
  }

  render() {
    const {question, renderPlayer} = this.props;
    const {answers, genre} = question;
    const {userAnswers} = this.state;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this._handleFormSubmit}
        >
          {answers.map(({src}, i) => (
            <div key={`${i}-${src}`} className="track">
              {renderPlayer(src, i)}
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`}
                  id={`answer-${i}`}
                  checked={userAnswers[i]}
                  onChange={this._handleInputChange(i)}
                />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
};


export default GenreQuestionScreen;
