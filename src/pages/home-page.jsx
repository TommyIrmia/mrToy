import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import logo from '../assets/img/toylogo.png'

class _HomePage extends React.Component {
    state = {}

    render() {
        return (
            <section className="home-page">
                <img src={logo} alt="Logo" />
                <h3>Welcome to Mister Toy!</h3>
                <h1>To see our toys click <Link to="/toy">HERE!</Link></h1>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)