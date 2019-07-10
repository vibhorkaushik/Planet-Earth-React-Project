import React from 'react';
import Config from "../Config"
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            showError: false
        };

    }

    componentDidMount() {
        let userData = sessionStorage.getItem('UserData')
        if (userData) {
          this.setState({
            isLoggedIn: true
          });
          this.props.history.push('/search');
        }
      }

    handleSubmit = (event) => {
        event.preventDefault();
        let apiURL = Config.baseUrl + Config.peopleSearchEndpoint;
        fetch(apiURL + this.state.userName + '&format=json')
            .then(responseJson => responseJson.json())
            .then(result => {
                result = result.results.filter(item => item.name === this.state.userName && item.birth_year === this.state.password);
                if (result.length > 0) {
                    this.props.handleLogin(true);
                    sessionStorage.setItem('UserData', JSON.stringify(result[0]));
                    this.props.history.push('/search')
                }

                else
                    this.setState({ showError: true });
            });
    }

    render() {
        const { showError } = this.state;
        return (
            <div className="container" id="colorlib-contact" >
                <div className="row">
                    <div className="col-md-4 col-md-push-8 animate-box">
                    </div>
                    <div className="col-md-8 col-md-pull-4 animate-box">
                        <h2>Tell us who are you.</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row form-group">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        placeholder="User Name"
                                        value={this.state.userName}
                                        onChange={event => this.setState({ userName: event.target.value })}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={event => this.setState({ password: event.target.value })}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="form-group">
                        <div className="col-md-6">
                            {showError && <span >Please Enter Correct Username/Password</span>}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(Login);