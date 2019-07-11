import React from "react";

const Footer = () => {
    return (
        <footer id="colorlib-footer">
            <div className="container">
                <div className="row row-pb-md">
                    <div className="col-md-3 colorlib-widget">
                        <h4>About Planet World</h4>
                        <p>Far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in
            Bookmarksgrove right at the coast of the Semantics</p>
                    </div>
                    <div className="col-md-3 colorlib-widget">
                    </div>

                    <div className="col-md-3 colorlib-widget">
                    </div>

                    <div className="col-md-3 colorlib-widget">
                        <h4>Contact Info</h4>
                        <ul className="colorlib-footer-links">
                            <li>Vibhor Kaushik</li>
                            <li><a href="tel://8588904709"><i className="icon-phone"></i>+91 8588904709</a></li>
                            <li><a href="mailto:vibhor.kaushik@3pillarglobal.com"><i
                                className="icon-envelope"></i>vibhor.kaushik@3pillarglobal.com</a></li>
                            <li><a href="/"><i className="icon-location4"></i>www.PlanetWorld.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="copy">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <p>
                                Copyright &copy;
              <script>document.write(new Date().getFullYear());</script> All rights are reserved to me!
            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;