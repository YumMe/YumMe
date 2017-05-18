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
            fetch: [],
            typingTimer: null
        };
        this.stringIsOnlyLetters = this.stringIsOnlyLetters.bind(this);
        this.resetTypingTimer = this.resetTypingTimer.bind(this);
        this.updateDropdownResults = this.updateDropdownResults.bind(this);
        this.clickSearchResult = this.clickSearchResult.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.showPosition = this.showPosition.bind(this);
}

    // typingTimer: change search results 200ms AFTER user stops typing
    resetTypingTimer(fast) {
        if (this.state.typingTimer != null) {
            clearTimeout(this.state.typingTimer);
        }
        var time = 200;
        if (fast === true) {
            time = 10;
        }
        this.setState({
            typingTimer: setTimeout(this.updateDropdownResults, time)
        });
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
        //this.updateDropdownResults();
        this.resetTypingTimer();
        this.getCurrentLocation();
    }

    // Verifies that a string is only letters (e.g. WA or CA but not 99 or WA99)
    stringIsOnlyLetters(string) {
        return string.match('^[A-Z]+$');
    }

    // Update dropdown results based on search
    updateDropdownResults() {
        var that = this;

        // Clear any previous API call requests
        clearTimeout(that.state.typingTimer);

        var searchQuery = that.state.search.trim();
        console.log(that.state.search);

        // Clear the timeout
        if (searchQuery === that.state.search) {
             that.setState({fetchTimeout: null});
        }

        // If nothing in the search bar, clear search results
        if (searchQuery === '') {
            that.setState({suggestedCities: []});
        } else {

            // http://api.geonames.org/searchJSON?q=sammamish&maxRows=10&username=greycabb
            that.state.fetch = fetch('http://api.geonames.org/searchJSON?maxRows=10&username=greycabb&country=us&featureCode=PPL&name_startsWith=' + searchQuery)
                .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        // Clear suggested cities
                        this.setState({suggestedCities: ["An error occurred"]});
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log(data);
                        if (data) {
                            var cityNames = ["[Results for " + searchQuery + "]"];
                            var resultCount = 0;
                            
                            // Cities
                            for (var k in data.geonames) {
                                var name = data.geonames[k].name;
                                var state = data.geonames[k].adminCode1;
                                
                                // Ignore non-letter state codes
                                if (state !== undefined && that.stringIsOnlyLetters(state)) {
                                    name += ', ' + state;

                                    // Ignore the result in the search bar
                                    if (name.toLowerCase() !== searchQuery.toLowerCase()) {
                                        cityNames.push(name);
                                        resultCount++;
                                    }

                                    // Stop at the 10th vallid result (city, state pair)
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

    // Type into search bar
    onChange(e) {
        //e.preventDefault();
        this.setState(
            {
                search: e.target.value
            }
        );
        clearTimeout(this.typingTimer);
        this.resetTypingTimer();
    }

    // Click search result, replacing text of search bar with what was clicked
    clickSearchResult(e, that) {
        
        var searchResultText = e.currentTarget.textContent;
        console.log(searchResultText);
        //document.getElementById("searchbar").innerHTML(searchResultText);
        
        var searchbar = that.refs.searchbar;
        searchbar.value = searchResultText;

        // Set new state
        this.setState(
            {
                search: searchResultText
            }
        );
        clearTimeout(this.typingTimer);
        this.resetTypingTimer(true);
    }

    // Location pointer icon
    getCurrentLocation() {
        if (!navigator.geolocation) {
            alert("Geolocation not supported in your browser");
        }
        var location = navigator.geolocation.getCurrentPosition(this.showPosition);
        console.log(location);
    }
    showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude); 
    }

    // Render in dom
    render() {
        var that = this;

        var dropdown =
            this.state.suggestedCities.map(function(city, i) {
                return <div key={i} onClick={(e) => that.clickSearchResult(e, that)}>{city}</div>;
            });

        return (
            <section role="region" id="searchBar">
                <input type="text" name="search" ref="searchbar" id="searchbar" placeholder="Where do you want to eat?" onKeyUp={(e) => this.onChange(e)}>
                </input>
                <div>
                    {dropdown}
                </div>
            </section>
        );
    }
}