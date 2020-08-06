import React, { useState } from 'react'
import { Link } from 'gatsby'
import Cookies from 'js-cookie'
import { Modal } from 'react-responsive-modal'
import Users from '../../User/Users'
import Register from '../../User/Register'
const RegisterTicket = ({ event, parentCall }) => {
    const [name1, setOpenFirst] = useState(false)
    const [name2, setOpenSecond] = useState(false)
    const formatAMPM = (date) => {
        var date = new Date(date);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const startTime = formatAMPM(event.eventStartTime)
    const endTime = formatAMPM(event.eventEndTime)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const date = new Date(event.eventStartTime)
    const year = date.getUTCFullYear()
    const month = monthNames[date.getUTCMonth() + 1]
    const datee = date.getUTCDate()
    var dif;
    dif = (new Date(event.eventEndTime) - new Date(event.eventStartTime)) / 1000 / 60;
    if (dif > 90) {
        dif = (new Date(event.eventEndTime) - new Date(event.eventStartTime)) / 1000 / 60 / 60;
    }
    const handleRegister = () => {
        var token = Cookies.get("token")
        if (token) {
            parentCall(2)
        } else {
            setOpenFirst(true)
        }
    }
    const callback = value => {
        var token = Cookies.get("token")
        if (value === "register") {
            setOpenFirst(false)
            setOpenSecond(true)
        } else if (value === "login") {
            setOpenSecond(false)
            setOpenFirst(true)
        } else if (token) {
            parentCall(2)
        } else {
            console.log('')
            // setShow(1)
        }
    }
    return (
        <>
            <div className="host-detail">
                <header className="head">
                    <Link to={`/hostEvents/${event.host.id}`} className="btn-back"><i className="icon icon-back"></i>Back</Link>
                    {/* <a href="#" className="share"><i className="icon icon-share"></i></a> */}
                </header>
                <div className="detail-box">
                    <div className="banner-image">
                        <img src={event.headerImage} alt="image description" />
                    </div>
                    <h1 className="h3">{event.title}</h1>
                    <div className="event-info">
                        <strong className="title">{event.slogan}</strong>
                        <strong className="duration">{(dif > 90 ? `${dif}hrs` : `${dif}mins`)}</strong>
                    </div>
                    <p>{event.description}</p>
                    <div className="row">
                        <div className="col">
                            <strong className="title">Cost:</strong>
                            <strong className="price">${event.price}</strong>
                        </div>
                        <div className="col">
                            <strong className="title">Capacity:</strong>
                            <strong className="guests">{event.capacity} guests</strong>
                        </div>
                    </div>
                    <div className="event-location">
                        <div className="col">
                            <i className="icon icon-calendar"></i>
                            <strong className="heading"><time>{`${month} ${datee}th, ${year}`}</time></strong>
                            <span className="time">{`${startTime}-${endTime}`}</span>
                        </div>
                        <div className="col">
                            <i className="icon icon-location"></i>
                            <strong className="heading">Location:</strong>
                            <address>{event.eventCity}</address>
                        </div>
                    </div>
                    <div className="host-info">
                        <div className="image-holder">
                            <img src={event.host.avatar} alt="image description" />
                        </div>
                        <div className="text-holder">
                            <strong className="title">{`${event.host.firstName} ${event.host.lastName}`}</strong>
                            <span className="designation">Fitness Trainer</span>
                        </div>
                    </div>
                    <h2 className="h3">Additional Notes:</h2>
                    <p>{event.additionalInfo}</p>
                    <button className="btn" onClick={handleRegister}>Register Ticket</button>
                </div>
            </div>
            {
                (name1) ? (
                    <Modal
                        styles={{ modal: { borderRadius: '14px' }, overlay: { background: 'rgba(0, 0, 0, 0.50)' } }}
                        open={name1}
                        onClose={() => setOpenFirst(false)}
                        classNames={{
                            animationIn: 'customEnterAnimation',
                            animationOut: 'customLeaveAnimation',
                        }}
                        center>
                        <Users parentCall={callback} />
                    </Modal>
                ) : (<div></div>)
            }
            {
                (name2) ? (
                    <Modal
                        styles={{ modal: { borderRadius: '14px' }, overlay: { background: 'rgba(0, 0, 0, 0.25)' } }}
                        open={name2}
                        onClose={() => setOpenSecond(false)}
                        classNames={{
                            animationIn: 'customEnterAnimation',
                            animationOut: 'customLeaveAnimation',
                        }}
                        animationDuration={1000}
                        center>
                        <Register parentCall={callback} />
                    </Modal>
                ) : null
            }
        </>
    )
}

export default RegisterTicket
