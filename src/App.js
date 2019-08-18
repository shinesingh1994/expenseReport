import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1,
            description: '',
            value: 0,
            currency: 'CAD',
            expense: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.currencyConvert = this.currencyConvert.bind(this);
    }

    handleChange(e, type) {
        console.log(type)
        this.setState({ [type]: e.target.value });
    }

    handleSubmit(e) {
        console.log('Total Expenses: ' + this.state.expense)
        let a = this.state.expense + this.state.value;
        this.setState({ expense: a })
        console.log('Total Expenses: ' + this.state.value)
        console.log('Total Expenses: ' + this.state.expense)
        // if (this.state.counter > 1) {
        //     this.setState({ expense: this.state.expense + this.state.value });
        // }
        if (this.state.counter > 5) {
            console.log('Total Expensess: ' + this.state.expense)
        }
        this.setState({ counter: this.state.counter + 1, description: '', value: 0 });
        e.preventDefault();
    }

    currencyConvert(e) {

        axios.get(`https://api.exchangeratesapi.io/latest?base=${e.target.value}`).then(res => {
            let conversionRate = res.data.rates.CAD;
            let convertedRate = this.state.value * conversionRate;
            this.setState({ expense: convertedRate });
            // console.log(this.state.expense)
        })
    }

    render() {
        return (
            <div className="App">
                <h1>Expense Report Generator</h1>
                <h2>Report #: {this.state.counter}</h2>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Description: <input type="text" value={this.state.description} name="Description" onChange={(item) => this.handleChange(item, 'description')} />
                        </label>
                        <label>
                            Amount: <input type="text" value={this.state.value} onChange={(item) => this.handleChange(item, 'value')} name="Amount" />
                        </label>
                        <label>
                            Currency: <select value={this.state.currency} onChange={this.currencyConvert}>
                                <option value="CAD">CAD</option>
                                <option value="HKD">HKD</option>
                            </select>
                        </label>
                        <input type="submit" disabled={(this.state.value > 1000 || this.state.expense > 1000) || this.state.counter > 5} value="Submit" />
                        {(this.state.value > 1000 || this.state.expense > 1000) ? (<h2 style={{ color: 'red' }}>Expense exceeding $1000 CAD!</h2>) : ''}
                    </form>
                </div>
            </div>
        );
    }
}
