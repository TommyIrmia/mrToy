import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import logo from '../assets/img/toylogo.png'
import { onLogout } from '../store/user.actions.js'
import { UserMsg } from './user-msg.jsx'


class _AppHeader extends React.Component {



    render() {
        const { user } = this.props
        return (
            <header>
                <UserMsg />

                <Link to="/">
                    <div className="logo">
                        <h1>Mister Toy</h1>
                        <img src={logo} alt="Logo.." />
                    </div>
                </Link>



                <nav>
                    <div className="login-container">
                        {!user && <p><Link to="/login">
                            <Button size="large" variant="contained" className="login-btn">
                                Login
                            </Button></Link></p>}
                        {user && <>Welcome {user.fullname} <br />
                            <Button onClick={() => this.props.onLogout()}
                                variant="contained" className="logout-btn" size="small">
                                Logout
                            </Button></>}
                    </div>
                    <Link to="/">Home</Link> |
                    <Link to="/toy"> Toys</Link> |
                    <Link to="/toy/dashboard"> Statistics</Link> |
                    <Link to="/about"> About</Link>
                </nav>
            </header >
        )
    }
}

function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    onLogout,
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)