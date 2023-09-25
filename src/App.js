import React from 'react';
import axios from "axios";

class Square extends React.Component {
    constructor() {
        super();
        this.state = {
            result: '',
            myInput: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClick = () => {
        console.log(this.state.myInput);
        axios.get(`https://vfnx4mn1h9.execute-api.us-east-2.amazonaws.com/prod?num=`+this.state.myInput)
            .then(res => {
                const result = res.data;
                this.setState({ result });
                console.log(result)
            })
            .catch(error => {
                console.error('ValueError: ', error);
                const result = { words: 'Invalid Input' };
                this.setState({ result });
            });
    }

    render() {
        return (
            <div>
                <p>Enter your number to convert to English words:</p>
                <input
                    name="myInput"
                    value={this.state.myInput}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleClick}>Submit</button>
                <button onClick={() => this.setState({ myInput: '', result: ''})}>Clear</button>
                <div>Result: <b>{this.state.result.words}</b></div>
            </div>
        )
    }
}

export default Square;
