import React, { Component } from 'react';
import { fetchJoke } from '../../apiCalls/apiCalls';
import './App.css';

function getRandomColor() {
  // rgba(255,0,0,0.3)
  // var letters = '0123456789ABCDEF';
  let hue = Math.floor(Math.random() * 255);
  // for (var i = 0; i < 3; i++) {
  //   color.push();
  // }
  // color = color.join(',');
  console.log(hue);
  const styles = {
    backgroundColor: `hsl(${hue}, 60%, 20%)`,
    color: `hsl(${hue}, 60%, 80%)`
  }
  console.log(styles);
  return styles;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: '',
      styles: getRandomColor()
    }
  }
  async componentDidMount() {
    try {
      const response = await fetchJoke();
      this.setState({ joke: response.joke });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div className='joke-wrapper' style={this.state.styles} >
        {this.state.joke}
      </div>
    )
  }
}

export default App;
