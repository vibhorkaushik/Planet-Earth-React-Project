import React from 'react';
import axios from 'axios';
import '../index.css';
import Config from "../Config";
import Loader from "./Loader";
import Planet from './Planet';

const PlanetList = ({ planets }) => (
    <div className="row planet-result" >
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

    onChangeHandle = async (event) => {
        event.preventDefault();
        this.setState({ planetName: event.target.value });
        let searchCount = sessionStorage.getItem('UserSearchCount');
        let userData = sessionStorage.getItem('UserData');
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
            if (isStillOneMinute && searchCount.searchCount >= 4 && userData.name !== "Luke Skywalker") {
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
        let searchedText = event.target.value;
        if (this.state.searchAllowed && searchedText.length) {
            this.state.searchAllowed = true;
            let apiURL = Config.baseUrl + Config.planetSearchEndpoint;
            const resp = await axios.get(apiURL + searchedText);
            this.setState({ planets: resp.data.results, dataPoints: this.convertInToChartData(resp.data.results), isLoading: false, nextUrl: resp.data.next, totalResults: resp.data.count });
        }
        if (!searchedText.length) {
            this.setState({ planets: [], isLoading: false, nextUrl: null, totalResults: 0 });
        }
        this.setState({ searchAllowed: this.state.searchAllowed });
    }

    LoadMore = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const resp = await axios.get(this.state.nextUrl);
        let planets = this.state.planets.concat(resp.data.results)
        let planetList = this.convertInToChartData(planets);

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
                                    onChange={this.onChangeHandle}
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
                                {totalResults > 0 && <li className="active"><a href="#">Total results {totalResults}</a></li>}
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