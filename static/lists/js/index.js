import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <h1>
          Welcome to your grocery list.
        </h1>
        <List />
        <SubmitButton />
      </div>
    );
  }
}

class List extends Component {
  render() {
    return (
      <ul>
        <li>Eggs</li>
        <li>Milk</li>
        <li>Meat</li>
      </ul>
    )
  }
}

class SubmitButton extends Component {
  render() {
    return (
      <div>
        <span>
          <input type="text" id="add_item"></input>
        </span>
        <button type="submit">Add</button>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
