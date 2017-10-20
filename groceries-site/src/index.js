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
  constructor() {
      super();
      this.state = {
          groceries: []
      };
  }

  componentDidMount() {
      this.grab_list();
  }
  
  grab_list = () => {
      fetch('http://localhost:8000/lists/list/')
      .then(response => {
          return response.json();
      })
      .then(responseJson => {
          this.setState({
            groceries: responseJson
          });
      })
  }

  render() {
    return (
      <ul>
      {this.state.groceries.map(grocery =>
      <li>{grocery.name} - x{grocery.quantity}</li>)}
      </ul>
    )
  }
}

class SubmitButton extends Component {
  render() {
    return (
      <div>
        <span>
          <p>Add item:</p>
          <input type="text" id="add_item"></input>
          <p>Quantity</p>
          <input type="test" id="quantity"></input>
        </span>
        <br/><br/>
        <button type="submit">Add</button>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));