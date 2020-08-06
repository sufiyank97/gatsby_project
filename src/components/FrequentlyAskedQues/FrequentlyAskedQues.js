import React, { useState } from 'react'
import Header from '../Header/Header'
const faq = [
    {
        ques: 'What’s the difference between a public event and private event?',
        ans: `Private Events are invite only events curated by Event Hosts and have specified demographics in mind in order to make sure the attendees have similar qualities to yours. 
        Public Events are open to anyone who in the public. These events can be fun and exciting as the opportunities are endless. These attendees may or may not have similar qualities to yours.  Check out the event that is best for you.
        `
    },
    {
        ques: 'While attending, should I be using a Wi-Fi Connection or a Cellular One?',
        ans: `Wi-Fi.`
    },
    {
        ques: 'What is a date? What is a match? What does matching mean ?',
        ans: [`MatchDate virtual speed dating events are made up of several dates. The number of dates will vary according to event and registered users. At the end of each date you will be asked to rate the date and if you would like to “match” with that date. If both parties agree to a match, then the match will be processed. Both parties have to agree to be matched. Inevitably, the number of dates you attend will be higher than the number of matches processed.`,

            `You will have 2 opportunities to “rate” a date---at the conclusion of each round of speed dating with your initial thoughts and notes (which are private). Then, at the end of the event and all rounds you will have a chance to submit your final matches. Once all matches have been submitted by all parties, the event host will process the matches. You will receive a push notification that matches have been processed and you will be able to view your matches from My Matches tab in the app. Please make sure your settings are enabled to receive these push notifications.  You can continue the conversation off app if desired by clicking on each Match in this tab.`]

    },
    {
        ques: 'Do you have recommendations on how to make my the most out of my experience?',
        ans: [`The following are Best Practices to get the most out of your experience:`,
            `●	Make sure your dating profile is completely filled out so event hosts can recommend events that fit your needs. This will also aid in the dates and processing of matches. Your profile will be viewed by your date prior to the actual date so your potential match gets an idea of your unique personality! Additionally, this is how potential future matches will be able to reach you post event. If you don’t have your contact email information filled out, then you will not be able to be reached.`,
            `●	Buy your ticket early---events do sell out.`,
            `●	Once the ticket has been purchased, enter the room 15 minutes early. This is your opportunity to familiarize yourself with the app, network and say hi to the event host (and other attendees) by clicking the “hi” icon.`,
            `●	Remember this is speed dating. You will want to put your best foot forward and quickly. Prior to event maybe think about a few things you would like to mention or ask. Dates generally last 3 to 5 mins and the time goes quickly. There is a countdown timer so you can plan your interaction accordingly. You will also have an opportunity to view the profile of your new date prior to the date.`,
            `●	Be in a quiet place. If there are connectivity issues, the app will always prioritize audio quality over video quality.`,
            `●	Make sure you submit your matches at the conclusion of the event. Matches must be processed for the event to officially be closed. You will then be notified of your Matches and they will also appear in the Matches tab in the app. If you are interested in continuing the conversation, click on your Match and then the email icon. You will have 2 opportunities to rate a potential match, one is immediately after your date with your initial thoughts and then one at the conclusion of the event with your final thoughts. Be sure to submit all matches. 
        `]
    },
    {
        ques: 'What happens if the ratios are uneven for a heterosexual event, ie, more males than females or vice versa?',
        ans: `Events will still proceed as  normal if there is an acceptable ratio of men vs women for a heterosexual event. One party may “sit and wait” for a date to end before being admitted into the next date. You will see a countdown until the next day begins. Do not presume the event is over if you do not see a date right away, you may just be waiting for your turn!`
    },
    {
        ques: 'How does MatchDate use my feedback to make sure my dates and matches fits my preferences?',
        ans: `Private events have been curated by MatchDate Event Hosts to  utilize state-of-the-art artificial intelligence and algorithms to match each round of the virtual speed dating event to match your preferences.`
    },
    {
        ques: 'How will I be “admitted” to a private event?',
        ans: `Attendees will receive an invitation code similar to other online meeting platforms. Go to the Discover tab on the app, then search icon on the upper right hand corner. Type in the unique invite code which will prompt you to purchase a ticket. Once the ticket has been purchased (we recommend purchasing ticket no later than 45 mins prior to event time) Once payment is received, you will then receive your ticket code that will serve as an entry to the event.`
    },
    {
        ques: 'What devices, programs or apps do I need to have access to for Match Date? Do I need a phone number with texting or an email address? What else?',
        ans: `MatchDate is available on both GooglePlay and the App Store. http://app.matchdate.singles/app or http://app.matchdate.co/app 
        MatchDate is a mobile application only. You will also need an email address to register for an event. 
        `
    },
    {
        ques: 'I was on the wait list but there were no openings--will I get a refund?',
        ans: `Yes, if you were on a wait list, but unable to attend the event, a full refund will automatically be credited to the purchasing account.`
    },
    {
        ques: 'The event is sold out--is there a wait list?',
        ans: `Yes, there is a wait list for all speed dating events. In the event there is a cancellation or increase in capacity, you will be notified immediately in the order of your place in the queue. `
    },
    {
        ques: 'The event is over, now what?',
        ans: [`For the event to be officially over, all parties must submit their individual match requests and the Event Host must then process the matches. You will receive a notification when the matches have been processed.`,
            `If there is a connection you would like to make with a mutual match, the MatchDate platform will facilitate this. Event Hosts will not facilitate any followup connections. If you have a great time---tell you friends and check out other events on our events page
        `]
    },
    {
        ques: 'Where do the attendees live? Are attendees based on region or other location?',
        ans: `Event Hosts organize events and invite attendees based on several different parameters. Some events will have attendees only from a certain geographic area (ie, just Illinois), while others will have invite lists from a much larger geographic area. If you have a specific request on what event you would like to attend based on geographic area, please reach out to your Event Host.`
    },
    {
        ques: 'How long are MatchDate events?',
        ans: `Each Match Date event will vary according to the type of event the Event Host organizes. Some Match Dates will have fewer rounds of speed dating while others will have more. As a general rule, please allow approx 60 minutes but some may be longer (or shorter).`
    },
    {
        ques: 'How often do MatchDate events occur?',
        ans: `As often as there is a demand! Because of the unique nature of this platform, the number of events is unlimited.`
    },
    {
        ques: 'What happens if I show up late to an event?',
        ans: `It is an Event Host’s discretion to admit late attendees to an event and when. As a rule, avoid being tardy as there is no guarantee for admitting or matching once the event has begun.`
    },
    {
        ques: 'How do I know that I won’t keep meeting the same people at different MatchDate events?',
        ans: `MatchDate will do everything we can to make sure there are very few overlaps. We encourage you to try different events organized by Event Hosts to meet new people.`
    },
    {
        ques: 'Can I block an attendee that I feel has behaved in appropriately?',
        ans: `If the need arises during a date to immediately block a user, please click the grey “block user” button. This action can not be undone and will be blocked from you for any future dates or events and will not appear as a match.`
    },
    {
        ques: 'How were attendees recruited? ',
        ans: `Event Hosts personally recruit attendees through their network and the social media network of other attendees and groups as well as other marketing and networking avenues. Events are curated according to certain demographics. Additionally, upon registration, users can opt in to allow MatchDate matchmakers to view basic profile information (without name) and then invite users to events.`
    },
    {
        ques: 'Will I receive any kind of reminders or notifications for events? ',
        ans: `You will receive email reminders and notifications after you have registered for an event as well prior to the event. If you would like to find out about all our events, check out our events page or subscribe. At this time, purchased tickets events do not sync with calendars, so it’s best practice to manage your attendance with your own calendar system.`
    },
    {
        ques: 'Is there an age limit or requirement to attend MatchDate?',
        ans: `MatchDate attendees must be 18 years or older but there is no age limit.`
    },
    {
        ques: 'Are there MatchDate events specifically for my sexual preference?',
        ans: `Event Hosts will organize events according to sexual preferences. If you are interested in specific events based on your sexual preference, make sure you reach out to your Event Hosts and communicate this.`
    },
    {
        ques: 'What methods of payment does MatchDate accept?',
        ans: `All major credit cards (VISA, Mastercard, AMEX. Discover) are accepted.`
    },
    {
        ques: 'What are the costs for each MatchDate event? ',
        ans: `Event tickets costs vary according to the type of event. Special pricing is available for multi-event ticket purchases as well as other discounts.`
    },
    // {
    //     ques: 'How does MatchDate protect my privacy and my feedback?',
    //     ans: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.`
    // },
    {
        ques: 'How can I join your team and become an Event Host?',
        ans: `Contact your Event Host who will then point you in the right direction to joining our team or contact us directly.`
    },
    {
        ques: 'What is your refund policy?',
        ans: `Refund can be facilitated up to 5 days prior to event and can transfer at anytime via support.  No refunds or transfers can be facilitated within 24 hours.`
    },
    {
        ques: 'Can I network or meet anyone prior to the event?',
        ans: `Once you are in the room, prior to the event (rooms open anywhere from 30 mins to 5 mins prior to event), you can click the “say hi” icon to connect with the Event Host. Event Hosts will also be communicating via Welcome Messages and Alert Messages which will appear in written format. Event Hosts will also be able to communicate via a Video and Audio Broadcast.`
    },
    {
        ques: 'The event is sold out--is there a wait list?',
        ans: `Yes, there is a wait list for all speed dating events. In the event there is a cancellation or increase in capacity, you will be notified immediately in the order of your place in the queue.`
    },
    {
        ques: 'How can my friends join me in an event?',
        ans: [`The Settings tab in the mobile app has an opportunity for you to share an exclusive pass with a friend. Furthermore, receive one more exclusive pass for every 10 invited friends that sign up. `,

            `Additionally, after you register for an event, there is an opportunity for you share via text or URL the registered event information for friends to know which private event you have already registered for
        `]
    }
]
const FrequentlyAskedQues = () => {
    const [state, setState] = useState({ id: '', active: false })
    const activeHandler = (i) => {
        setState({
            ...state,
            id: i,
            active: !state.active
        })
    }
    return (
        <>
            <div className="top-container style06">
                <Header image="/images/header/logo-white.svg" />
                <div className="visual-area">
                    <div className="container1" style={{ marginBottom: '4em' }}>
                        <div className="visual-caption">
                            <h1>Frequently Asked Questions</h1>
                        </div>
                    </div>
                </div>
            </div>
            <main className="main">
                <div className="accordion-section">
                    <div className="container1">
                        <ul className="accordion">
                            {faq.map((f1, id) => {
                                return (
                                    <li key={id} className={state.id === id ? (state.active ? 'active' : null) : null}>
                                        <a href="#" className="accordion-opener" onClick={(e) => {
                                            e.preventDefault()
                                            activeHandler(id)
                                        }}>{f1.ques}</a>
                                        <div className="accordion-slide">
                                            <div className="slide-text">
                                                {
                                                    (Array.isArray(f1.ans)) ?
                                                        (
                                                            f1.ans.map((a1, a) => {
                                                                return (
                                                                    <React.Fragment key={a}>
                                                                        <p>{a1}</p>
                                                                        <br />
                                                                    </React.Fragment>
                                                                )
                                                            })
                                                        ) :
                                                        (
                                                            <p>{f1.ans}</p>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}

export default FrequentlyAskedQues

