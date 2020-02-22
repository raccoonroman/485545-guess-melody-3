import React, {PureComponent} from 'react';
import AudioPlayer from "../../components/audio-player/audio-player.jsx";

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activePlayerId: 0,
      };
    }

    _handlePlayButtonClick(id) {
      return () => {
        const {activePlayerId} = this.state;
        this.setState({
          activePlayerId: activePlayerId === id ? -1 : id
        });
      };
    }

    render() {
      const {activePlayerId} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(src, id) => {
          return (
            <AudioPlayer
              src={src}
              isPlaying={id === activePlayerId}
              onPlayButtonClick={this._handlePlayButtonClick(id)}
            />
          );
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
