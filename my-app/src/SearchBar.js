import React from 'react';

/*
    ping @michael if you have questions

    The search bar that appears on all 3 pages
*/

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestedCities: [],
        };
    }

    // When the page loads
    componentWillMount() {
        var that = this;

        // Finds suggested cities
        // http://www.geonames.org/export/geonames-search.html
        
        // example endpoint: http://api.geonames.org/search?q=london&maxRows=10&username=demo
        /*
            name_startsWith =>  whatever is in the search bar
            maxRows =>          10
            country =>          US
            orderby =>          population (that's the default)
        */
        fetch('http://api.geonames.org/searchJSON?q=sammamish&maxRows=10&username=greycabb&name_startsWith=sammamish')
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
                        for (var k in data.geonames) {//adminCode1
                            cityNames.push(data.geonames[k].name);
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


    render() {
        return (
            <section role="region" id="searchBar">
                {/*<div>search bar place holder</div>*/}

            {/*<div id="custom-search-input" className="form-control">
                <div className="input-group col-md-12">
                    <input type="text" className="form-control input-l light" placeholder="Where do you want to eat?" />
                    <span className="input-group-btn">
                        <button className="btn btn-info btn-lg" type="button">
                            <i className="glyphicon glyphicon-search"></i>
                        </button>
                    </span>
                </div>
            </div>*/}
<form>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"></input>
  </div>
  <button type="submit" className="btn btn-default">Submit</button>
</form>





                <div>
                    {this.state.suggestedCities}
                </div>
            </section>
        );
    }
}