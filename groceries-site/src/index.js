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
            groceries: [],
            done: []
        };
    }

    componentDidMount() {
        this.grab_list();
    }

    componentWillUpdate() {
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
            <div>
                <ul>
                {this.state.groceries.map(grocery =>
                <span><input type="checkbox" name={grocery.name} value={grocery.id}></input>{grocery.name} - x{grocery.quantity}<br></br></span>)}
                </ul>
                <button type="submit">Mark as done</button>
            </div>
        )
    }
}

class SubmitButton extends Component {
    constructor() {
        super();
        this.state = {
            add_item: "",
            quantity: ""
        }
    }

    addItemChange = (e) => {
        this.setState({add_item: e.target.value});
    }

    quantityChange = (e) => {
        this.setState({quantity: e.target.value});
    }
    
    handleClick = (e) => {
        var dataBody = "name="+ this.state.add_item + "&quantity="+ this.state.quantity;
        fetch('http://localhost:8000/lists/list/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dataBody
        })
        List.grab_list();
        document.getElementById("add_item").value = "";
        document.getElementById("quantity").value = "";
    }

    render() {
        return (
            <div>
                <span>
                <p>Add item:</p>
                <input type="text" id="add_item" onChange={this.addItemChange}></input>
                <p>Quantity</p>
                <input type="text" id="quantity" onChange={this.quantityChange}></input>
                </span>
                <br/><br/>
                <button type="submit" onClick={this.handleClick}>Add</button>
            </div>
        )
    }
}

render(<App />, document.getElementById('root'));