'use strict';
import './toolbar.css'

const toolbar = document.createElement('torn-tools')
document.body.appendChild(toolbar)

console.log('hello world')
debugger

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('body');
ReactDOM.render(e(LikeButton), domContainer);
