import React from 'react';
import { hashHistory } from 'react-router';

/*
    ping @michael if you have questions

    The search bar that appears on all 3 pages
*/

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // By city name
            search: '',
            city: '',

            // By latitude/longitude
            latitude: '',
            longitude: '',

            // Search results
            suggestedCities: [],
            fetch: [],
            typingTimer: null,

            locationServicesAllowed: true,
            showingErrorMessage: false
        };
        this.stringIsOnlyLetters = this.stringIsOnlyLetters.bind(this);
        this.resetTypingTimer = this.resetTypingTimer.bind(this);
        this.updateDropdownResults = this.updateDropdownResults.bind(this);
        this.clickSearchResult = this.clickSearchResult.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.goToSearchResultsPage = this.goToSearchResultsPage.bind(this);
        this.requestLocationServices = this.requestLocationServices.bind(this);

        this.requestLocationServices();
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
    componentDidMount() {
        // Finds suggested cities
        // http://www.geonames.org/export/geonames-search.html

        // example endpoint: http://api.geonames.org/search?q=london&maxRows=10&username=demo
        /*
            name_startsWith =>  whatever is in the search bar
            maxRows =>          10
            country =>          US
            orderby =>          population (that's the default)
        */
        this.resetTypingTimer();
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
            that.setState({ fetchTimeout: null });
        }

        // If nothing in the search bar, clear search results
        if (searchQuery === '') {
            that.setState({ suggestedCities: [] });
        } else {
            // featureCode=PPL
            // http://api.geonames.org/searchJSON?q=sammamish&maxRows=10&username=greycabb removed maxRows=10
            that.state.fetch = fetch('http://api.geonames.org/searchJSON?username=greycabb&country=us&cities=cities1000&name_startsWith=' + searchQuery)
                .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        // Clear suggested cities
                        this.setState({ suggestedCities: ["An error occurred"] });
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log(data);
                        if (data) {
                            var cityNames = [];//["[Results for " + searchQuery + "]"];
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

                                    // Stop at the 5th vallid result (city, state pair)
                                    if (resultCount >= 5) {
                                        break;
                                    }
                                }
                            };
                        }
                        that.setState({ suggestedCities: cityNames });
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
        console.log('clicked: ' + searchResultText);

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

        setTimeout(function () {
            that.goToSearchResultsPage();
        }, 2400);
    }


    // Request permission for getting current location
    requestLocationServices() {

        var that = this;

        if (!navigator.geolocation) {
            alert("Geolocation not supported in your browser");
            return;
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log('ur tracked hehe');
            that.setState({
                locationServicesAllowed: true
            });
        },
            function (error) {
                if (error.code === error.PERMISSION_DENIED) {
                    console.log('ur not tracked lol');
                    that.setState({
                        locationServicesAllowed: false
                    });
                }
            });

        // Check if user has allowed location services

    }

    // Location pointer icon: get user's current latitude, longitude
    getCurrentLocation() {

        var that = this;

        if (!navigator.geolocation) {
            alert("Geolocation not supported in your browser");
            return;
        }
        console.log('woop');

        var latAndLong = [];
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                that.setState({
                    lat: lat,
                    long: long,
                    currentLocationSearch: true,
                });
                latAndLong.push(lat, long);
            }
        );
        return latAndLong;
    }
    // Go to search results page, using either city name or state
    goToSearchResultsPage(e, currentLocation) {

        var that = this;

        if (e !== undefined && e !== false) {
            e.preventDefault();
        }

        // if not false, then we are using current location
        var latAndLong = false;

        var usingCurrentLocation = false;

        // since current location is asynchronous, delay a bit at first if using current location
        var delay = 0;

        if (currentLocation === true || this.state.search.trim() === '') {

            if (this.state.locationServicesAllowed === true) {
                latAndLong = this.getCurrentLocation();

                // delay 500ms
                console.log('moo');
                console.log(latAndLong);

                usingCurrentLocation = true;

                delay = 1200;
                // get city from lat and long
                function getCityFromCoords(latAndLong, that) {
                    var apiCall =
                        'https://api.geonames.org/findNearbyPlaceNameJSON?lat='
                        + latAndLong[0]
                        + '&lng='
                        + latAndLong[1]
                        + '&username=greycabb&cities=cities1000';
                    console.log(apiCall);
                    // http://api.geonames.org/searchJSON?maxRows=10&username=greycabb&country=us&cities=cities1000&name_startsWith=' + searchQuery

                    that.state.fetch = fetch(apiCall)
                        .then(
                        function (response) {
                            if (response.status !== 200) {
                                return;
                            }

                            // Examine the text in the response
                            response.json().then(function (data) {
                                console.log(data);
                                if (data) {

                                    // Cities
                                    if (data.geonames !== undefined) {
                                        for (var i = 0; i < data.geonames.length; i++) {
                                            var name = data.geonames[0].name;
                                            var state = data.geonames[0].adminCode1;

                                            // Ignore non-letter state codes
                                            if (state !== undefined && that.stringIsOnlyLetters(state)) {
                                                name += ', ' + state;

                                                var searchbar = that.refs.searchbar;
                                                searchbar.value = 'your current location: ' + name;


                                                break;
                                            }
                                        }
                                    };
                                }
                                //that.setState({ suggestedCities: cityNames });
                            });
                        }
                        )
                        .catch(function (err) {
                            console.log('Fetch Error :-S', err);
                        });

                }
                setTimeout(function () { getCityFromCoords(latAndLong, that) }, 200);
                this.setState({
                    city: name
                })

            } else {
                // Make this a text below instead
                console.log('Please enter a city!');
                this.setState({
                    showingErrorMessage: "Please enter a city!"
                });
                return;
            }
        }

        // Parameters:

        // 1) city = city name
        //      ignored if lat and long are specified
        // 2) lat = latitude
        // 3) long = longitude
        //      ignored if mylocation = false

        setTimeout(function () {
            var lat = '';
            var long = '';
            if (latAndLong !== false && usingCurrentLocation === true) {
                lat = latAndLong[0];
                long = latAndLong[1];
            }
            if (usingCurrentLocation === true) {
                console.log('Going to search results page for current location');
                // kinda bad, find a different solution instead of reload
                console.log('/search?lat=' + lat + '&long=' + long);
                window.location.reload();
                hashHistory.push('/search?lat=' + lat + '&long=' + long);
            } else if (usingCurrentLocation === false) {
                console.log('Going to search results page for "' + that.state.search + '"');
                window.location.reload();
                hashHistory.push('/search?city=' + that.state.search.trim());
            }
        }, delay);
    }



    // Render in dom
    render() {
        var that = this;

        var showDropdown = false;
        var dropdown = null;

        if (this.state.suggestedCities.length > 0) {
            showDropdown = true;
            dropdown =
                this.state.suggestedCities.map(function (city, i) {
                    return <div key={i} onClick={(e) => that.clickSearchResult(e, that)} className="highlight-on-hover dropdown-result">{city}</div>;
                });
        }

        return (
            <div>
                <div className="search">
                    <div className="search-form" onKeyUp={(e) => this.onChange(e)} onSubmit={(e) => this.goToSearchResultsPage(e)} onChange={(e) => this.onChange(e)}>
                        <form action="#" className="dropdown">
                            {this.state.locationServicesAllowed === true &&
                                <i className="fa fa-location-arrow location-pointer pointer-on-hover" aria-hidden="true" onClick={(e) => this.goToSearchResultsPage(e, true)}></i>
                            }
                            {this.state.locationServicesAllowed === false &&
                                <i className="fa fa-location-arrow location-pointer pointer-on-hover" aria-hidden="true" onClick={function () {
                                    alert('Please enable location services to use this feature!'); that.setState({
                                        showingErrorMessage: "Please enable location services to use this feature!"
                                    });
                                } }></i>
                            }
                            <div className="mdl-textfield mdl-js-textfield">
                                <input className="mdl-textfield__input" type="search" id="sample1" ref="searchbar" placeholder="Where do you want to eat?" autoComplete="off" />

                                {
                                    showDropdown === true &&
                                    <div className="dropdown-content change-cursor-to-pointer-on-hover">
                                        {dropdown}
                                    </div>
                                }
                            </div>
                            {this.state.showingErrorMessage !== false &&
                                <div className="error-message">{this.state.showingErrorMessage}</div>
                            }
                            {this.state.showingErrorMessage === false &&
                                <div></div>
                            }

                        </form>

                        {/*<br />*/}
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect button light go-button" onClick={this.goToSearchResultsPage}>
                            Go!
                        </button>
                        <h1>{this.state.name}</h1>
                    </div>
                </div>
            </div>
        );
    }
}