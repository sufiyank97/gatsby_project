import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import DatePicker from "react-datepicker";
import "./react-datepicker.css";
import { connect } from 'react-redux'
import { getEvents } from '../../redux/Events/events.action'
import { Link } from 'gatsby'
import Events from './Events'
const EventsCalendar = (props) => {
    const [date, setDate] = useState(new Date())
    const [events, getEvents] = useState([])
    const [eventId, geteventId] = useState({ hostId: '', eventId: '' })
    useEffect(
        () => {
            getEvents(props.event.apiEvents)
        }, [props.event.apiEvents]
    )
    const dateFn = (date) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const year = date.getUTCFullYear()
        const month = monthNames[date.getUTCMonth() + 1]
        const datee = date.getUTCDate()
        var date1 = datee + "-" + month + "-" + year
        return date1
    }
    const handleChange = date => {

        setDate(date);

        const propEvents = [...props.event.apiEvents]
        var newEvents = propEvents.filter(e => {
            return new Date(e.eventRoomOpenAt) <= new Date(date)
        })
        getEvents(newEvents)
    };

    return (
        <>

            <div className="top-container style04">
                <Header image="/images/header/logo-white.svg" />
                <div className="visual-area">
                    <div className="container1" style={{ marginBottom: '12em' }}>
                        <div className="visual-caption">
                            <span className="symbol-icon">
                                <img src="images/calendar/symbol.svg" alt="symbol" />
                            </span>
                            <h1>Events Calendar</h1>
                            <p>Check back often as new events are added frequently that will suit  your time and interests!</p>
                            <div className="calender-field">
                                <DatePicker
                                    selected={date}
                                    id="calender"
                                    onChange={handleChange}
                                />
                                <label htmlFor="calender" style={{ right: "48px" }}><i className="icon-calendar1"></i></label>
                            </div>
                            {/* <button className="btn">Register Now</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <main className="main">
                <div className="events-info-section">
                    <div className="container1">
                        <ul className="events-list">
                            {
                                events.map(e1 => {
                                    return (
                                        <li key={e1.id}>
                                            <div className="image-holder" style={{ width: '100%', height: '62%' }}>
                                                <Link to={`/hostEvent/${e1.id}`} ><img src={e1.headerImage} alt="image-description" style={{ height: '17em' }} /></Link>
                                            </div>
                                            <div className="description">
                                                <strong className="title"><Link to={`/hostEvent/${e1.id}`} >{e1.title}</Link></strong>

                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </main>

        </>
    )
}

const mapStatetoProps = (state) => {
    return {
        event: state.event
    }

}

export default connect(mapStatetoProps, { getEvents })(EventsCalendar)



// onClick={() => geteventId({ ...eventId, hostId: e1.host.id, eventId: e1.id })}