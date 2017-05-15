import React from 'react';

/*
    ping @michael if you have questions

    The search bar that appears on all 3 pages
*/

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            suggestedCities: [],
        };
    }

    // When the page loads
    componentWillMount() {
        // Finds suggested cities
        // http://www.geonames.org/export/geonames-search.html
        
        // example endpoint: http://api.geonames.org/search?q=london&maxRows=10&username=demo
        /*
            name_startsWith =>  whatever is in the search bar
            maxRows =>          10
            country =>          US
            orderby =>          population (that's the default)
        */
        this.updateDropdownResults();
    }

    // Verifies that a string is only letters
    stringIsOnlyLetters(string) {
        // regex: ^[A-Z]+$
        return string.match('^[A-Z]+$');
    }

    // Update dropdown results based on search
    updateDropdownResults() {
        var that = this;

        var searchQuery = this.state.search.trim();
        console.log(this.state.search);

        // If nothing in the search bar, clear search results
        if (searchQuery === '') {
            this.setState({suggestedCities: []});
        } else {

            // http://api.geonames.org/searchJSON?q=sammamish&maxRows=10&username=greycabb
            fetch('http://api.geonames.org/searchJSON?q=' + searchQuery + '&maxRows=10&username=greycabb&country=us&name_startsWith=' + searchQuery)
                .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        // Clear suggested cities
                        this.setState({suggestedCities: []});
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log(data);
                        if (data) {
                            var cityNames = [];
                            var resultCount = 0;
                            for (var k in data.geonames) {
                                var name = data.geonames[k].name;
                                var state = data.geonames[k].adminCode1;
                                
                                // Ignore non-letter state codes
                                if (state !== undefined && that.stringIsOnlyLetters(state)) {
                                    name += ', ' + state;
                                    cityNames.push(name);
                                    resultCount++;
                                    if (resultCount >= 10) {
                                        break;
                                    }
                                }
                            };
                        }
                        that.setState({suggestedCities: cityNames});
                    });
                }
                )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
            }
    }

    // When the user types into the search bar,
    // change search results in dropdown
    // todo
    handleChange(event) {
        var field = event.target.name;
        var value = event.target.value;

        var changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    // Type into search bar
    onChange(e) {
        e.preventDefault();
        console.log(e.target.value);
        this.setState(
            {
                search: e.target.value
            }
        );
        this.updateDropdownResults();
    }

    // Render in dom
    render() {
        return (
            <section role="region" id="searchBar">
                <input type="text" name="search" placeholder="Where do you want to eat?" onChange={(e) => this.onChange(e)} onKeyUp={(e) => this.onChange(e)}>
                </input>
                <div>
                    {this.state.suggestedCities}
                </div>
            </section>
        );
    }
}