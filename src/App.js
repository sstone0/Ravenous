import React, { Component } from 'react';
import './App.css';

import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';
import Footer from './components/Footer/Footer';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			businesses: []
		};
		this.searchYelp = this.searchYelp.bind(this);
	}

	searchYelp(term, location, sortBy) {
		Yelp.search(term, location, sortBy).then(businesses => {
			this.setState({
				businesses: businesses
			});
		});
	}

	render() {
		return (
			<div className="App">
				<h1>Ravenous</h1>
				<SearchBar searchYelp={this.searchYelp} />
				<BusinessList businesses={this.state.businesses} />
				<Footer />
			</div>
		);
	}
};

export default App;
