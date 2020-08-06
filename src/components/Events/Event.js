import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { getEvents } from '../../redux/Events/events.action'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Player, BigPlayButton } from 'video-react'
import "./video.css";
import './style.css'
import RegisterTicket from './Event/RegisterTicket'
import BookEvent from './Event/BookEvent'
import { Link } from 'gatsby'
const Event = (props) => {

    const [event, setEvent] = useState({})
    const [show, setShow] = useState(1)
    let thisYear = (new Date()).getFullYear();
    const [monthOptions, getMonth] = useState({ options: null, value: null })
    const [yearOptions, getYears] = useState({ options: null, value: null })
    useEffect(
        () => {
            const event = props.event.apiEvents.find(a1 => a1.id === props.id)
            setEvent(event)
            const yearsOptions = [], monthsOptions = []
            for (var i = 0; i <= 60; i++) {
                const Year = thisYear;
                yearsOptions.push({ value: Year, label: Year.toString() })
                thisYear = thisYear + 1
            }
            for (var i = 1; i <= 12; i++) {
                const Month = i
                monthsOptions.push({ value: Month, label: Month.toString() })
            }
            getYears({
                ...yearOptions,
                options: yearsOptions,

            })
            getMonth({
                ...monthOptions,
                options: monthsOptions
            })
        }, []
    )



    const callback = value => {
        setShow(value)
    }
    return (
        <>
            <div id="wrapper">

                <Header image="/images/header/logo.svg" />
                <main className="main">
                    <section className="block-event">
                        <div className="container1">
                            {

                                ((Object.keys(event).length > 1) ?
                                    (
                                        <Fragment key={event.host.id}>
                                            <div className="col-left">
                                                <div className="profile-info">
                                                    <div className="image-holder">
                                                        <img src={event.host.avatar} alt="image description" />
                                                    </div>
                                                    <blockquote>
                                                        <cite>{`${event.host.firstName} ${event.host.lastName}`}</cite>
                                                        <q>{`${event.host.hostProfile.quote}`}</q>
                                                    </blockquote>
                                                </div>
                                                {
                                                    (event.host.hostProfile.introVideo ?
                                                        (
                                                            <div className="video-area">
                                                                <Player
                                                                    fluid={false}
                                                                    width={'100%'}
                                                                    height={255}
                                                                    poster={`${event.host.hostProfile.introVideo.thumbnail}`}
                                                                    src={`${event.host.hostProfile.introVideo.video}`}
                                                                >

                                                                    <BigPlayButton position="center" />
                                                                </Player>
                                                            </div>
                                                        ) :
                                                        (
                                                            <div></div>
                                                        )
                                                    )
                                                }
                                                <p>{event.host.hostProfile.description}</p>
                                                <ul className="list-detail">
                                                    <li>
                                                        <strong className="title">Home:</strong>
                                                        <span className="text">{event.host.hostProfile.homeCity.description}</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            {
                                                ((show === 1) ?
                                                    (
                                                        <div className="col-right">
                                                            <RegisterTicket event={event} parentCall={callback} />
                                                        </div>

                                                    ) : (show === 2) ?
                                                        (
                                                            <div className="col-right">
                                                                <BookEvent event={event} parentCall={callback} />
                                                            </div>
                                                        ) : (show === 3) ?
                                                            (
                                                                <div className="col-right">
                                                                    <div className="block-confirmation">
                                                                        <h1 className="h2">Confirmation</h1>
                                                                        <p>You booking has been confirmed. Looking forward to see you at our event.</p>
                                                                        <div className="alert-confirmation">
                                                                            <div className="image-holder">
                                                                                <img src="/images/icon-tick.png" alt="image description" />

                                                                            </div>
                                                                            <strong className="title">Booked</strong>
                                                                        </div>
                                                                        <h2 className="h2">Next Step: Download App for Date</h2>
                                                                        <p>You need to download the app to get ready for your dating event.</p>
                                                                        <a href="https://apps.apple.com/us/app/matchdate-virtual-speed-date/id1507460521" target="_blank" className="btn">Download Now</a>
                                                                        <span className="link-holder">
                                                                            <Link to="/events" className="link">Continue <i className="icon icon-back"></i></Link>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ) : null
                                                )
                                            }

                                        </Fragment>

                                    ) :
                                    (
                                        <div>Loading...</div>
                                    )
                                )
                            }



                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    )
}
const mapStatetoProps = state => {
    return {
        event: state.event,
        user: state.user
    };
};
export default connect(mapStatetoProps, { getEvents })(Event)












{/* <div className="popup-holder">
                                <div className="popup-frame">
                                    <div className="popup-wrap">
                                        <div className="box-wrap">
                                            <header className="head">
                                                <h2>Message Jamie:</h2>
                                                <a href="#" className="btn-close"><i className="icon icon-close"></i></a>
                                            </header>
                                            <form action="#" className="form-message">
                                                <div className="field">
                                                    <div className="field">
                                                        <label htmlFor="email">Your Email:</label>
                                                        <input type="email" id="email" />
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="message">Message:</label>
                                                        <textarea id="message"></textarea>
                                                    </div>
                                                    <input type="submit" className="btn" value="Try A MatchDate Event" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div > */}