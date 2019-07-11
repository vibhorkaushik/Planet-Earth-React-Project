import React from "react";
import { Link } from "react-router-dom"

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        sessionStorage.clear();
        // this.props.history.push('/')
        this.props.handleLogin(false);
    }

    render() {
        return (
            <div>
                <div className="colorlib-loader"></div>
                <nav className="colorlib-nav">
                    <div className="top-menu">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-2">
                                    <div id="colorlib-logo"><a href="/">planet World</a></div>
                                </div>
                                <div className="col-md-10 text-right menu-1">
                                    <ul>
                                        {this.props.isLoggedIn && <li className=""><Link to="/search">Search</Link></li>}
                                        {this.props.isLoggedIn && <li className=""><span className="logout-span" onClick={this.handleLogout} >Log Out</span></li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <section id="home" className="video-hero"
                    style={{ height: '90px', backgroundImage: `url('images/cover_img_1.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundAttachment: 'fixed' }}
                    data-section="home">
                    <div className="overlay"></div>
                </section>
            </div>
        )
    }
}

export default Header;