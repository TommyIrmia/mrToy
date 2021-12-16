import React from 'react';

import { eventBusService } from '../services/event-bus.service.js'


export class UserMsg extends React.Component {

    removeEvent;
    timeoutId

    state = {
        msg: null
    }

    componentDidMount() {
        this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
            clearTimeout(this.timeoutId)
            this.setState({ msg })
            this.timeoutId = setTimeout(() => {
                this.setState({ msg: null })
            }, 2500)
        })
    }

    componentWillUnmount() {
        this.removeEvent()
        clearTimeout(this.timeoutId)
    }

    render() {
        if (!this.state.msg) return <React.Fragment></React.Fragment>
        const msgClass = this.state.msg.type || ''
        return (
            <section className={'user-msg ' + msgClass}>
                <button onClick={() => {
                    this.setState({ msg: null })
                }}>x</button>
                {this.state.msg.txt}
            </section>
        )
    }
}
