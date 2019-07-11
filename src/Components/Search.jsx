import React from 'react';
import axios from 'axios';
import '../index.css';
import Config from "../Config";
import Loader from "./Loader";
import Planet from './Planet';
import debounce from 'lodash/debounce';

const PlanetList = ({ planets }) => (
    <div className="row planet-result" >
        <div className="row">
            <div className="col-md-0 col-md-push-12 animate-box"></div>
            <div className="col-md-12 col-md-pull-0 animate-box">
                <h3 className="planet-list-label">Planets And Their Population</h3>
            </div>
        </div>
        {
            planets.map((planetDetail, index) => <Planet key={index} planetDetail={planetDetail} />)
        }
    </div >
);




class Search extends React.Component {
    state = {
        planetName: '',
        planets: [],
        isLoading: false,
        searchAllowed: true,
        nextUrl: '',
        totalResults: 0
    };

    convertInToChartData(planets) {
        planets.forEach(obj => {
            obj.population = obj.population === 'unknown' ? 0 : +obj.population;
        })
        planets.sort((a, b) => parseInt(b.population) - parseInt(a.population));
        return planets;
    }


    handleChange = (event) => {
        event.preventDefault();
        this.setState({ planetName: event.target.value });
        return this.SearchPlanets(event.target.value)
    }

    SearchPlanets = debounce(async (value) => {
        let searchedText = value;
        if (!searchedText.length) {
            this.setState({ planets: [], isLoading: false, nextUrl: null, totalResults: 0 });
            return;
        }
        let searchCount = sessionStorage.getItem('UserSearchCount');
        let userData = sessionStorage.getItem('UserData');
        if(!userData){
           return this.props.history.push('/')
        }
        if (!searchCount) {
            searchCount = {
                searchCount: 1,
                time: new Date().getTime()
            }
            this.state.searchAllowed = true;
            sessionStorage.setItem("UserSearchCount", JSON.stringify(searchCount));
        } else {
            searchCount = JSON.parse(searchCount);
            userData = JSON.parse(userData);
            let isStillOneMinute = (new Date() < new Date(searchCount.time).setMinutes(new Date(searchCount.time).getMinutes() + 1));
            if (isStillOneMinute && searchCount.searchCount >= 5 && userData.name !== "Luke Skywalker") {
                this.state.searchAllowed = false;
            } else {
                this.state.searchAllowed = true;
                if (!isStillOneMinute) {
                    searchCount.time = new Date().getTime();
                    searchCount.searchCount = 1;
                } else {
                    searchCount.searchCount++;
                }
                sessionStorage.setItem("UserSearchCount", JSON.stringify(searchCount));
            }
        }

        if (this.state.searchAllowed && searchedText.length) {
            this.state.searchAllowed = true;
            let apiURL = Config.baseUrl + Config.planetSearchEndpoint;
            const resp = await axios.get(apiURL + searchedText);
            this.setState({ planets: this.convertInToChartData(resp.data.results), isLoading: false, nextUrl: resp.data.next, totalResults: resp.data.count });
        }

        this.setState({ searchAllowed: this.state.searchAllowed });
    }, 750);

    LoadMore = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const resp = await axios.get(this.state.nextUrl);
        let planets = this.convertInToChartData(this.state.planets.concat(resp.data.results))

        this.setState({
            planets: planets,
            isLoading: false,
            nextUrl: resp.data.next
        });
    }

    render() {
        const { planets, isLoading, searchAllowed, nextUrl, totalResults } = this.state
        return (
            <>

                <div className="container" id="colorlib-contact">
                    <div className="row">
                        <div className="col-md-4 col-md-push-8 animate-box">
                            <div className="loader">
                                {isLoading && <Loader />}
                            </div>

                        </div>
                        <div className="col-md-8 col-md-pull-4 animate-box">
                            <h2>What you want to search.</h2>
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Enter Planet Name"
                                    value={this.state.planetName}
                                    onChange={this.handleChange}
                                    required
                                    className="form-control"
                                />
                            </form>

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-4 col-md-push-8 animate-box"></div>
                        <div className="col-md-8 col-md-pull-4 animate-box">
                            {!searchAllowed && <span className="search-limit">Maximum limit to search in minute has exceeded. Kindly wait for sometime.</span>}
                        </div>
                    </div>
                    {planets.length > 0 && <PlanetList planets={planets} />}

                    <div className="row">
                        <div className="col-md-12 text-center">
                            <ul className="pagination">
                                {totalResults > 0 && <li className="active"><a href="javascript:void(0)">Total results {totalResults}</a></li>}
                                {nextUrl && <li><a href="javascript:void(0)" onClick={this.LoadMore}>»</a></li>}
                            </ul>
                        </div>
                    </div>
                </div>


            </>
        )
    }
}

export default Search;