import React, {Component} from 'react';
import './App.css';
import QuoteMachine from './components/QuoteMachine';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quotes: [],
			selectedQuoteIndex: null
		}
		this.assignQuoteIndex = this.assignQuoteIndex.bind(this);
		this.selectQuoteIndex = this.selectQuoteIndex.bind(this);
	}

	componentDidMount() {
		// fetch quotes
		fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
			.then(data => data.json())
			.then(mQuotes => this.setState({quotes: mQuotes}, this.assignQuoteIndex));
	}

	selectedQuote() {
		// return the selected quote
		if(!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex))
			return undefined;
		else return this.state.quotes[this.state.selectedQuoteIndex];
	}

	selectQuoteIndex(){
		// generate and return new quote index
		if(!this.state.quotes.length)
			return undefined;
		else
			return Math.floor(Math.random()*(this.state.quotes.length));
	}

	assignQuoteIndex(){
		this.setState({selectedQuoteIndex: this.selectQuoteIndex()});
	}

	render() { 
		return (
    		<div className="App" id="quote-box">
				<QuoteMachine selectedQuote={this.selectedQuote()} assignQuoteIndex={this.assignQuoteIndex} />
    		</div>
		);
	}
}

export default App;
