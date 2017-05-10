import React from 'react';

/*
    ping @michael if you have questions

    The search bar that appears on all 3 pages
*/

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    // When the page loads
    componentDidMount() {


        // Finds suggested cities
        // http://www.geonames.org/export/geonames-search.html
        
        // example endpoint: http://api.geonames.org/search?q=london&maxRows=10&username=demo
        /*
            name_startsWith =>  whatever is in the search bar
            maxRows =>          10
            country =>          US/USA
            orderby =>          population



        */



        // 5/10/2017 testing API: Google Places API
        // test Seattle

        //https://maps.googleapis.com/maps/api/place/nearbysearch/json?parameters

        /*
            Required Parameters
                @key        => AIzaSyChXBucOpcxrW2wlwhjpEBHWaZXf2NjBrQ
                @location   => Latitude, Longitude
                @rankby     => use "distance"
                @radius     => (actually optional) gets stuff in a radius

            Optional Parameters
                Not that useful:
                    @keyword        => name, type, address (probably not needed)
                    @language       => multilanguage support (probably not needed)
                    @minprice       => min price
                    @maxprice       => max price

                Useful:
                    @opennow        => only gets places that are open
                    @types          => "food" gets only restaurants
            ____________________
            Example Calls:

                https://maps.googleapis.com/maps/api/place/textsearch/xml
                    ?query=restaurants+in+Sydney
                    &key=AIzaSyChXBucOpcxrW2wlwhjpEBHWaZXf2NjBrQ
                    &location=42.3675294,-71.186966
                    &radius=10000
                    &rankby=distance
                    &types=food

        */
        var apiKey = "AIzaSyChXBucOpcxrW2wlwhjpEBHWaZXf2NjBrQ";
        var query = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Seattle&key=" + key + "&rankby=distance&types=food";



    }

    // When the user types into the search bar,
    // change search results in dropdown
    handleChange(event) {
        var field = event.target.name;
        var value = event.target.value;

        var changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }


    render() {
        return (
            <section role="region" id="searchBar">
                Beep
            </section>
        );
    }
}