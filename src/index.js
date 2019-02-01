import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const baseUrl = 'https://icanhazdadjoke.com/';
const opts = {
  headers: {
    'Accept': 'application/json'
  }
}

function getRandomColor() {

  let hue = Math.floor(Math.random() * 255);

  const styles = {
    backgroundColor: `hsl(${hue}, 60%, 20%)`,
    color: `hsl(${hue}, 40%, 80%)`
  }
  return styles;
}

const App = ({joke, styles}) => {
  return(
    <div className='joke-wrapper' style={styles} >
      {joke}
    </div>
  )
};

async function startApp() {
  const response = await fetch(baseUrl, opts);
  const data = await response.json();
  const styles = getRandomColor();
  ReactDOM.render(
    <App
      joke={data.joke}
      styles={styles}
    />,
  document.getElementById('root'));
}

startApp();
