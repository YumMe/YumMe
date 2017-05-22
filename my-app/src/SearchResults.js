import React, { Component } from 'react';
import logo from './logo.svg';
import SearchResultsGrid from './SearchResultsGrid';
import SearchBar from './SearchBar';

class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            top50Venues: undefined,
            location: this.props.location,
            isCityString: this.props.isCityString,
            test: "test"
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        fetch('https://api.foursquare.com/v2/venues/search?near=Seattle,WA&query=meesum&v=20170605&oauth_token=BDZNBZTLKPWYMKVBHHSZSJJ2J0XJOGPBAT0P1QS0HLVNIQFA')
            .then(
            (response) => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response  
                response.json().then((data) => {
                    this.setState({top50Venues: data});
                    //console.log(JSON.stringify(this.state));
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    render() {
        return (
            <div>
                <div className="title">
                    YumMe!
                </div>
                <SearchBar />
                <SearchResultsGrid topVenues = {this.state.top50Venues} test = {this.state.test}/>
            </div>
        );
    }
}

export default SearchResults;
