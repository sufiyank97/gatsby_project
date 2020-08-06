import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import './style.css'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import axios from '../../../../config/axios'
import swal from 'sweetalert'
const BookEvent = ({ event, parentCall, user }) => {
    const { handleSubmit, register, errors, setError, clearError } = useForm();

    let thisYear = (new Date()).getFullYear();
    const [monthOptions, getMonth] = useState(null)
    const [yearOptions, getYears] = useState(null)


    useEffect(
        () => {
            const yearsOptions = [], monthsOptions = []
            for (var i = 0; i <= 60; i++) {
                const Year = thisYear;
                yearsOptions.push(Year)
                thisYear = thisYear + 1
            }
            for (var i = 1; i <= 12; i++) {
                const Month = i
                monthsOptions.push(Month)
            }
            getYears(yearsOptions)
            getMonth(monthsOptions)
        }, []
    )
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
    const [cardType, setCardType] = useState(null)
    const [discountCode, setDiscount] = useState({ value: '', data: '' })

    const onSubmit = async (values) => {
        values['userId'] = user.id
        values['eventId'] = event.id
        values['total'] = event.price
        values['name'] = user.name
        values['email'] = user.email
        values['eventUserId'] = ''
        values['testMode'] = true
        delete values['creditCard']
        if (Object.keys(discountCode.data).length > 1) {

            values['discountId'] = discountCode.data.discountCodeId
            values['subTotal'] = event.price
            values['discount'] = discountCode.data.discount
            values['total'] = discountCode.data.total
            const res = await axios.post('/saveBooking', values)
            try {
                if (res.data.err) {
                    if (res.data.err.error) {
                        swal('Error', String(res.data.err.error.message), 'error')
                    } else {
                        swal('Error', String(res.data.err), 'error')
                    }
                } else if (res.data.status === "fail") {

                    swal('Error', String(res.data.status), 'error')
                } else {
                    parentCall(3)
                }
            } catch (e) {
                swal('Error', String(e), 'error')
            }
        } else {
            const res = await axios.post('/saveBooking', values)
            try {
                if (res.data.err) {
                    if (res.data.err.error) {

                        swal('Error', String(res.data.err.error.message), 'error')
                    } else {
                        swal('Error', String(res.data.err), 'error')
                    }
                } else if (res.data.status === "fail") {

                    swal('Error', String(res.data.status), 'error')
                } else {
                    parentCall(3)
                }
            } catch (e) {
                swal('Error', String(e), 'error')
            }
        }

    }

    const handleDiscount = async () => {
        const discountData = {
            eventId: event.id,
            discountCode: discountCode.value,
            subTotal: event.price
        }

        const res = await axios.post('/findDiscount', discountData)
        try {
            if (res.data.message) {
                swal('Error', String(res.data.message), 'error')
                setDiscount({ ...discountCode, data: '' })
            } else {
                setDiscount({ ...discountCode, data: res.data })
            }
        } catch (e) {
            swal('Error', String(e), 'error')
        }
    }

    return (
        <>
            <div className="host-detail">
                <header className="head">
                    <a type="button" className="btn-back" onClick={() => parentCall(1)}><i className="icon icon-back"></i>Back</a>
                </header>
                <div className="detail-box style">
                    <h1 className="h3">{event.title}</h1>
                    <p>{event.description}</p>
                    <div className="event-location" style={{ marginBottom: '17px' }}>
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

                    <form className="form-booking" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row-fields">
                            <div className="col1">
                                <label htmlFor="promo">Promo/Pass Code:</label>
                            </div>
                            <div className="col">
                                <input type="text" id="promo" style={{ width: '190%' }} onChange={(e) => setDiscount({ ...discountCode, value: e.target.value })} />
                            </div>
                            <div className="col" style={{ textAlign: '-webkit-right' }}>
                                <FontAwesome className="fas fa-plus-square" size="2x" type="button"
                                    name="increment" style={{ color: '#ff51b3', marginTop: '0.2em' }} onClick={handleDiscount} />
                            </div>
                        </div>
                        <div className="row-fields">

                            <div className="col1">
                                <strong className="heaing">Cost:</strong>
                            </div>
                            <div className="col1">
                                <div className="price-info" style={{ justifyContent: 'flex-end' }}>
                                    <strong className="price">${event.price}</strong>
                                </div>
                            </div>
                            {
                                (Object.keys(discountCode.data).length > 1) ?
                                    (
                                        <>
                                            <div className="col1">
                                                <strong className="heaing">Total Cost:</strong>
                                            </div>
                                            <div className="col1">
                                                <div className="price-info" style={{ justifyContent: 'flex-end' }}>
                                                    <strong className="price">${discountCode.data.total}</strong>
                                                </div>
                                            </div>
                                        </>
                                    ) : null
                            }
                        </div>

                        <hr />
                        <div className="row-fields">
                            <div className="col1">
                                <label htmlFor="card">Card Type:</label>
                            </div>
                            <div className="col1">
                                <select
                                    id="card"
                                    name="creditCard"
                                    style={{ width: '100%' }}
                                    onChange={(e) => { setCardType(e.target.value) }}
                                    ref={register({ required: true })}
                                >
                                    <option hidden value="">Select Card Type</option>
                                    <option value="VISA">VISA</option>
                                    <option value="MASTER CARD">MASTER CARD</option>
                                    <option value="DISCOVER">DISCOVER</option>
                                </select>
                            </div>
                        </div>
                        <div className="row-fields">
                            <div className="col1">
                                <label htmlFor="name">Name on Card:</label>
                                <input type="text" name="cardName" id="name" style={{ width: '207%' }} ref={register({ required: true })} />
                            </div>
                        </div>
                        <div className="row-fields">
                            <div className="col1">
                                <label htmlFor="number">Card Number:</label>
                                <input type="text" name="cardNumber" id="number" style={{ width: '207%' }} ref={register({
                                    required: true,
                                })}
                                    onChange={
                                        (e) => {
                                            const value = e.target.value;
                                            var regex = /[^0-9]/gi;
                                            e.target.value = e.target.value.replace(regex, "");
                                            var visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
                                            var masterCard = /^(?:5[1-5][0-9]{14})$/;
                                            var discover = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
                                            if (cardType === "VISA") {
                                                if (value.match(visa)) {
                                                    return clearError("cardNumber");
                                                }
                                                else {
                                                    setError("cardNumber", "notMatch", "Not a Valid VISA Card Number");
                                                }
                                            } else if (cardType === "MASTER CARD") {
                                                if (value.match(masterCard)) {
                                                    return clearError("cardNumber");
                                                }
                                                else {
                                                    setError("cardNumber", "notMatch", "Not a Valid MASTER Card Number");
                                                }
                                            } else if (cardType === "DISCOVER") {
                                                if (value.match(discover)) {
                                                    return clearError("cardNumber");
                                                }
                                                else {
                                                    setError("cardNumber", "notMatch", "Not a Valid DISCOVER Card Number");
                                                }
                                            } else {
                                                setError("cardNumber", "notMatch", "Select Card Type");
                                            }
                                        }
                                    }
                                />
                                {errors.cardNumber && <p className="errors">{errors.cardNumber.message}</p>}
                            </div>
                        </div>
                        <div className="row-fields">
                            <div className="col1">
                                <label htmlFor="ccv">CCV:</label>
                            </div>
                            <div className="col1 d-flex" style={{ justifyContent: "flex-end" }}>
                                <input type="password" name="ccv" id="ccv" style={{ width: '38%' }} ref={register({ required: true })}
                                    maxLength="3"
                                    onChange={
                                        (e) => {
                                            const value = e.target.value;
                                            var regex = /[^0-9]/gi;
                                            e.target.value = e.target.value.replace(regex, "");
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className="row-fields">
                            <div className="col1">
                                <label htmlFor="expiry">Expire Date:</label>
                            </div>
                            <div className="col1">
                                <div className="two-fields">
                                    <div className="field">
                                        <select id="expiry" name="expireMonth" style={{ width: '100%' }} ref={register({ required: true })}>
                                            <option hidden value="">Month</option>
                                            {
                                                (monthOptions) ?
                                                    monthOptions.map(m1 => {
                                                        return (
                                                            <option key={m1} value={m1}>{m1}</option>
                                                        )
                                                    }) : (<option>Loading...</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className="field">
                                        <select id="expiry1" name="expireYear" style={{ width: '100%' }} ref={register({ required: true })}>
                                            <option hidden value="">Year</option>
                                            {
                                                (yearOptions) ?
                                                    yearOptions.map(y1 => {
                                                        return (
                                                            <option key={y1} value={y1}>{y1}</option>
                                                        )
                                                    }) : (<option>Loading...</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <label className="check-holder">
                            <input type="checkbox" name="saveCardForFutureUse" value={true} ref={register} />
                            <span className="fake-check"></span>
                                                                        Save card for later use
                                                                    </label>
                        <input type="submit" className="btn" value="Book Event" />
                    </form>
                </div>
            </div>
        </>
    )
}
const mapStatetoProps = state => {
    return {
        user: state.user
    };
};
export default connect(mapStatetoProps)(BookEvent)




