import React, {Component} from 'react';
import QuoteMachine from './components/QuoteMachine';
import 'typeface-roboto';
import {Grid, withStyles} from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';

const styles = {
	container: {
		display: 'flex',
		height: '100vh',
		alignItems: 'center',
		backgroundColor: deepPurple[500]
	}
};

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
    		<Grid className={this.props.classes.container}
id="quote-box" justify="center" container>
				<Grid item>
					{
						this.selectedQuote() ?
						<QuoteMachine selectedQuote={this.selectedQuote()} assignQuoteIndex={this.assignQuoteIndex} /> : null
					}
				</Grid>
    		</Grid>
		);
	}
}

export default withStyles(styles)(App);
