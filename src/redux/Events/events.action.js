import { eventsActionTypes } from './events.types'
import axios from '../../../config/axios'
export const setAllEvents = (events) => ({
    type: eventsActionTypes.SET_EVENTS,
    payload: events
})
export const setApiEvents = (data) => ({
    type: eventsActionTypes.SETAPI_EVENTS,
    payload: data
})
export const getEvents = () => {
    return async (dispatch) => {

        const res = await axios.get('/getEvents')
        const data = [...res.data.events]

        const events = []
        let count = 1
        res.data.events.forEach(d1 => {
            const host = {}
            if (count === 1) {
                host['host'] = d1.host
                const event = { ...d1 }
                delete event.host

                host['event'] = [event]
                events.push(host)
            } else {
                const check = events.find(f1 => f1.host.id === d1.host.id)
                if (check) {
                    events.forEach(e1 => {
                        if (e1.host.id === d1.host.id) {

                            const event = { ...d1 }
                            delete event.host
                            e1.event.push(event)

                        }
                    })
                } else {
                    host['host'] = d1.host
                    const event = { ...d1 }
                    delete event.host

                    host['event'] = [event]
                    events.push(host)
                }
            }
            count++

        })
        dispatch(setAllEvents(events))
        dispatch(setApiEvents(data))

        return 'done';
    }
}