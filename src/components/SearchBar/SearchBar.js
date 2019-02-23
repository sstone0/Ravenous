import React from 'react';
import './SearchBar.css';

const sortByOptions = {
	'Best Match': 'best_match',
	'Highest Rated': 'rating',
	'Most Reviewed': 'review_count'
};

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.enterSearch = this.enterSearch.bind(this);
		this.state = {
			term: '',
			location: '',
			sortBy: 'best_match'
		};

	}

	getSortByClass(sortByOptionValue) {
		if (this.state.sortBy === sortByOptionValue) {
			return 'active';
		} else {
			return '';
		}
	}

	handleSortByChange(sortByOption) {
		this.setState({
			sortBy: sortByOption
		});
	}

	handleTermChange(event) {
		this.setState({
			term: event.target.value
		});
	}

	handleLocationChange(event) {
		this.setState({
			location: event.target.value
		});
	}

	handleSearch(event) {
		this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
	}

	enterSearch(e) {
		if (e.keyCode === 13) {
			this.handleSearch();
		}
	}

	renderSortByOptions() {
		return Object.keys(sortByOptions).map(sortByOption => {
			let sortByOptionValue = sortByOptions[sortByOption];
			return (
				<li className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)} key={sortByOptionValue}>
					{sortByOption}
				</li>
			);
		});
	}

	render() {
		return (
			<div className="SearchBar">
				<div className="SearchBar-sort-options">
					<ul>{this.renderSortByOptions()}</ul>
				</div>
				<div className="SearchBar-fields">
					<input onChange={this.handleTermChange} placeholder="Search Businesses or food" onKeyDown={this.enterSearch} />
					<input onChange={this.handleLocationChange} placeholder="Where?" onKeyDown={this.enterSearch} />
				</div>
				<div onClick={this.handleSearch} className="SearchBar-submit">
					<button>Let's Go</button>
				</div>
			</div>
		);
	}
}

export default SearchBar;
