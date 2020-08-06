import React from 'react'
import Header from '../Header/Header'
import { useForm } from "react-hook-form";
import axios from '../../../config/axios'
import swal from 'sweetalert'
const Contact = () => {
    const { handleSubmit, register, reset } = useForm();
    const onSubmit = async (values, e) => {
        const res = await axios.post('/contactUs', values)
        try {
            if (res.data.err) {
                swal('Error', String(res.data.err.error.message), 'error')
            } else {
                await swal('Thank You', 'You will get Notified soon!', 'success')
                e.target.reset()
            }
        } catch (e) {
            swal('Error', String(e), 'error')
        }
    }
    return (
        <>
            <div className="top-container style06" style={{ backgroundImage: "url('/images/contact.jpg')", height: '750px' }}>
                <Header image="/images/header/logo.svg" value={true} />

                <div className="visual-area">
                    <div className="container1" style={{ marginBottom: '5.5em' }}>
                        <div className="visual-caption">
                        </div>
                    </div>

                </div>
            </div>
            <div className="contact-form--1" style={{ margin: '1em' }}>
                <div className="container">
                    <div className="row row--35 align-items-start">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <div className="section-title text-left mb--50">

                            </div>
                            <div className="form-wrapper">
                                <form className="form-message" onSubmit={handleSubmit(onSubmit)}>
                                    <label htmlFor="item01">
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="item01"
                                            ref={register}
                                            required
                                            size="64"
                                            placeholder="First Name *"
                                        />
                                    </label>

                                    <label htmlFor="item02">
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="item02"
                                            ref={register}
                                            required
                                            size="64"
                                            placeholder="Last Name *"
                                        />
                                    </label>
                                    <label htmlFor="item02">
                                        <input
                                            type="email"
                                            name="email"
                                            size="64"
                                            maxLength="64"
                                            ref={register}
                                            required
                                            id="item02"
                                            placeholder="Your email *"
                                        />
                                    </label>

                                    <label htmlFor="item04">
                                        <textarea
                                            type="text"
                                            id="item04"
                                            name="message"
                                            ref={register}
                                            required
                                            rows="4" cols="50"
                                            placeholder="Your Message"
                                        />
                                    </label>
                                    <div style={{ textAlign: '-webkit-center' }}>
                                        <button className="btn" type="submit" value="submit" name="submit" id="mc-embedded-subscribe">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2">
                            <div className="thumbnail mb_md--30 mb_sm--30">
                                <img src="/images/contact/banner.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
