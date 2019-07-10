import React from "react";
// import "../node_modules/bulma/bulma.sass";
import "./sass/App.scss";
import Login from "./Components/Login";
import Search from "./Components/Search";
import { StaticRouter, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PlanetDetail from "./Components/PlanetDetail";
import AuthenticatedRoute from "./Components/AuthenticatedRoute";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Planet from './Components/Planet';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(loggedIn) {
    this.setState({
      isLoggedIn: loggedIn
    });
    if (!loggedIn) {
      sessionStorage.clear();
      return (<Redirect to={{ pathname: '/' }} />)
    }
  }

  componentDidMount() {
    let userData = sessionStorage.getItem('UserData')
    if (userData) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  render() {
    return (
      <>
        <Router>
          <Header isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} />
          <Route path={["/login", "/"]} exact render={() => <Login isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} />} />
          <StaticRouter location="/Assets" context={{}}></StaticRouter>
          <AuthenticatedRoute path='/search' component={Search} />
          <AuthenticatedRoute path='/planet' component={Planet} />
          <AuthenticatedRoute path='/planet-detail/:Id' component={PlanetDetail} />
          {/* <Route render={() => <Redirect to="/" />} /> */}
        </Router>
        <Footer />
      </>
    )
  }
}

export default App;
