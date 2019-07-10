import React from "react";
import '../index.css';
import axios from 'axios';
import Config from "../Config";
import Loader from "./Loader";


class PlanetDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planetDetail: {},
            isLoading: false
        }
        this.getProductDetail(this.props.match.params["Id"])
    }

    getProductDetail = async (id) => {
        this.setState({ isLoading: true });
        let apiURL = Config.baseUrl + Config.planetDetailEndpoint;
        const resp = await axios.get(apiURL + id + "/");
        this.setState({ planetDetail: resp.data, isLoading: false });
    }

    render() {
        let imageUrl = "/img/planet-3.jpg";
        const { planetDetail, isLoading } = this.state;
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-push-8">
                    </div>
                    <div className="col-md-8 col-md-pull-4">
                        <div className="loader">
                            {isLoading && <Loader />}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-md-push-8 animate-box">
                    </div>
                    <article className="col-md-8 col-md-pull-4 animate-box planet-detail">
                        <div className="staff-entry" style={{ background: `url(${imageUrl})` }}>
                        </div>
                        <h2 className="col-md-8">{planetDetail.name}</h2>
                        <div className="col-md-8"><h5 className="col-md-8">Rotation Period</h5><span className="col-md-4">{planetDetail.rotation_period}</span></div>
                        <div className="col-md-8"><h5 className="col-md-8">Surface Water</h5><span className="col-md-4">{planetDetail.surface_water}</span></div>
                        <div className="col-md-8"><h5 className="col-md-8">Orbital Period</h5><span className="col-md-4">{planetDetail.orbital_period}</span></div>
                        <div className="col-md-8"><h5 className="col-md-8">Gravity</h5><span className="col-md-4">{planetDetail.gravity}</span></div>
                        <div className="col-md-8"><h5 className="col-md-8">Diameter</h5><span className="col-md-4">{planetDetail.diameter}</span></div>
                        <div className="col-md-8"><h5 className="col-md-8">Climate</h5><span className="col-md-4">{planetDetail.climate}</span></div>
                        <div className="col-md-8"><h5 className="col-md-8">Terrain</h5><span className="col-md-4">{planetDetail.terrain}</span></div>
                        {(planetDetail.population !== "unknown") && <div className="col-md-8"><h5 className="col-md-8">Population</h5><span className="col-md-4">{planetDetail.population}</span></div>}
                    </article>
                </div>
            </div>
            </div>
        )
    }
}


export default PlanetDetail;