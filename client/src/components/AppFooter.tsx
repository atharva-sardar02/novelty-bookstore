import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";


function AppFooter() {
    return (
        <footer>
            <section>
                <section className="image-button">
                    <Link to="/">
                        <img
                            src={require('../assets/images/site/copyright.png')}
                            alt="copyright button"
                        />
                        <section>
                            Copyright
                        </section>
                        <section>
                            All Rights Reserved
                        </section>
                    </Link>
                </section>
            </section>
            <section>
                <p>
                    Directions
                </p>
                <section className="social-media-icons">
                    <section className="image-button">
                        <Link to="/">
                            <img
                                src={require('../assets/images/site/dir.png')}
                                alt="directions button"
                            />
                        </Link>
                    </section>
                </section>
            </section>
            <section>
                <p>
                    Contact Us
                </p>
                <section className="social-media-icons">
                    <section className="image-button">
                        <Link to="/">
                            <img
                                src={require('../assets/images/site/gm.png')}
                                alt="gmail button"
                            />
                        </Link>
                    </section>
                    <section className="image-button">
                        <Link to="/">
                            <img
                                src={require('../assets/images/site/fb.png')}
                                alt="facebook button"
                            />
                        </Link>
                    </section>
                    <section className="image-button">
                        <Link to="/">
                            <img
                                src={require('../assets/images/site/tw.png')}
                                alt="twitter button"
                            />
                        </Link>
                    </section>
                </section>
            </section>
        </footer>
    )
}

export default AppFooter;
