import React from 'react'
import { Link, navigate } from 'gatsby'
import { useForm } from "react-hook-form";
import axios from '../../../config/axios'
import swal from 'sweetalert'
const Footer = () => {

    const { handleSubmit, register } = useForm();
    const onSubmit = async (values) => {
        const res = await axios.post('/addToList', values)

        try {
            if (res.data.err) {
                swal('Error', String(res.data.err.error.message), 'error')
            } else {

                await swal('Thank You', 'You will get a Notifications for Upcoming Events', 'success')
                navigate('/contact-us')
            }
        } catch (e) {
            swal('Error', String(e), 'error')
        }
    }
    return (
        <footer className="footer">
            <div className="container1">
                <div className="footer-top">
                    <strong className="f-logo">
                        <Link to="/"><img src="/images/footer/logo-white.svg" alt="MATCHDATE" /></Link>
                    </strong>
                    <ul className="social-networks">
                        <li><a href="https://www.facebook.com/MatchDateEvents?utm_source=matchdate_website&utm_medium=site_footer&utm_campaign=generic" target="_blank"><i className="icon icon-facebook"></i></a></li>
                        <li><a href="https://twitter.com/MatchDateEvents?utm_source=matchdate_website&utm_medium=site_footer&utm_campaign=generic" target="_blank"><i className="icon icon-twitter"></i></a></li>
                        <li><a href="https://www.instagram.com/MatchDateEvents/?utm_source=matchdate_website&utm_medium=site_footer&utm_campaign=generic" target="_blank"><i className="icon icon-instagram"></i></a></li>
                    </ul>
                </div>
                <div className="three-cols">
                    <div className="col-apps">
                        <strong className="title">Available On</strong>
                        <ul className="list-apps">
                            <li>
                                <a href="https://play.google.com/store/apps/details?id=com.matchdate&referrer=utm_source%3DMDSite%26utm_medium%3Dfooter%26anid%3Dadmob" target="_blank"><i className="icon icon-play-store"></i>Google Play Store </a>
                            </li>
                            <li>
                                <a href="https://apps.apple.com/us/app/matchdate-virtual-speed-date/id1507460521" target="_blank"><i className="icon icon-apple-store"></i>Apple App Store</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-links">
                        <ul className="footer-links">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/about">Why Us?</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/terms-of-service">Terms Of Service</Link></li>
                            <li><Link to="/contact-us">Contact US</Link></li>
                            <li><Link to="/contact-us">Help</Link></li>
                            {/* <li><Link to="/testimonial">Testimonial</Link></li> */}
                        </ul>
                    </div>
                    <div className="col-form" style={{ display: 'flex', justifyContent: 'center' }}>
                        <form className="form-booking" onSubmit={handleSubmit(onSubmit)}>
                            <strong className="title">Subscribe</strong>
                            <input type="text" name="listName" placeholder="Enter Name" ref={register({ required: true })} />
                            <input type="email" name="email" placeholder="Enter Email" ref={register({ required: true })} />
                            {/* <textarea placeholder="Message"></textarea> */}
                            <input type="submit" value="Subscribe Now" className="btn btn-secondary" />
                        </form>
                    </div>
                </div>
                <p>Made in NYC. All member work copyright of respective owner, otherwise <a href="#">&copy; 2020 MatchDate</a></p>
            </div>
        </footer>
    )
}

export default Footer
