import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

class Planet extends React.Component {

    render() {
        const { planetDetail } = this.props;
        let [barRow, classColor] = [10, "info"];

        let populationLimit = [
            { population: 10, class: "info" },
            { population: 100, class: "info" },
            { population: 1000, class: "success" },
            { population: 10000, class: "success" },
            { population: 100000, class: "success" },
            { population: 1000000, class: "warning" },
            { population: 10000000, class: "warning" },
            { population: 100000000, class: "warning" },
            { population: 1000000000, class: "danger" },
            { population: 10000000000, class: "danger" },
            { population: 100000000000000, class: "danger" }];

        for (let i = 0; i < populationLimit.length; i++) {
            let obj = populationLimit[i];
            if (obj.population > planetDetail.population) {
                barRow = populationLimit.indexOf(obj) * 10;
                classColor = obj.class;
                break;
            }
        }

        let splittedUrl = planetDetail.url.split('/');
        let planetId = splittedUrl.length && splittedUrl[splittedUrl.length - 2];
        let planetUrl = "/planet-detail/" + planetId;
        return (

            <div className="row">
                <a href={planetUrl} className="planet-bar">
                    <div className="col-md-10 col-md-push-2 animate-box">
                        <ProgressBar variant={classColor} now={barRow} />
                    </div>
                    <div className="col-md-2 col-md-pull-10 animate-box">

                        <h4>{planetDetail.name}</h4>


                    </div>
                </a>
            </div >

        )
    }
}

export default Planet;